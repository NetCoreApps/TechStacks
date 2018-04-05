<template>
  <div>
      <v-layout v-if="!id && errorSummary">
        <v-alert outline color="error" icon="warning" :value="true">
          Organization was not found
        </v-alert>                  
      </v-layout>
      <v-layout v-else-if="forbidden">
        <v-alert outline color="error" icon="warning" :value="true">
          Access is limited to Organization Owners and Moderators
        </v-alert>                  
      </v-layout>
      <v-layout v-else-if="!isOrganizationModerator">
        <v-alert outline color="error" icon="warning" :value="true">
          You must be a moderator to be able to manage this Organization
        </v-alert>
      </v-layout>
      <v-layout v-else-if="id" class="body" fluid column>
        <v-flex>
          <v-toolbar>
            <v-toolbar-title>
              {{ name }}
            </v-toolbar-title>
          </v-toolbar>

          <v-card>
            <v-card-title>
              <v-form v-model="valid" ref="form" lazy-validation style="width:900px">
                <v-container>
                  <v-alert outline color="error" icon="warning" :value="errorSummary">{{ errorSummary }}</v-alert>                  
                  <v-layout column>

                    <v-text-field
                      label="Organization Name"
                      v-model="name"
                      required                        
                      :disabled="!isOrganizationOwner"
                      :rules="nameRules"
                      :counter="nameCounter"
                      :error-messages="errorResponse('name')"
                      ></v-text-field>

                    <v-text-field
                      label="Slug"
                      v-model="slug"
                      required
                      :disabled="!isOrganizationOwner"
                      :rules="slugRules"
                      :counter="slugCounter"
                      :error-messages="errorResponse('slug')"
                      ></v-text-field>


                    <Editor ref="editor"
                        style="padding-top:10px"
                        label="Description"
                        v-model="description"
                        :counter="descriptionCounter"
                        :rules="descriptionRulesOptional"
                        :error-messages="errorResponse('description')"
                        :lang="getLangByOrganizationId(id)"
                        :disabled="!isOrganizationOwner"
                        @save="submit"
                        @close="reset()"
                        />

                    <v-select
                      label="Allowed Post Types"
                      autocomplete
                      multiple
                      chips
                      :disabled="!isOrganizationOwner"
                      :items="allPostTypeSelectItems"
                      v-model="postTypes"
                      ></v-select>

                    <v-select
                      label="Moderator Post Types (inherits above if unspecified)"
                      autocomplete
                      multiple
                      chips
                      :disabled="!isOrganizationOwner"
                      :items="allPostTypeSelectItems"
                      v-model="moderatorPostTypes"
                      ></v-select>

                    <v-select
                      label="Pre-selected Post Types for new Subscriptions"
                      autocomplete
                      multiple
                      chips
                      :disabled="!isOrganizationOwner"
                      :items="allPostTypeSelectItems"
                      v-model="defaultSubscriptionPostTypes"
                      ></v-select>

                    <v-layout>
                        <v-select style="margin-right:5px"
                          label="Default Post Type"
                          :disabled="!isOrganizationOwner"
                          :items="allPostTypeSelectItems"
                          v-model="defaultPostType"
                          ></v-select>

                        <v-select
                          label="Primary Language"
                          autocomplete
                          :items="langSelectItems"
                          v-model="lang"
                          :error-messages="errorResponse('lang')"
                          ></v-select>

                        <v-checkbox
                          style="margin: 10px 0 0 10px"
                          label="Don't allow Member Invites"
                          v-model="disableInvites"
                        ></v-checkbox>
                    </v-layout>

                    <v-text-field
                      label="Automatically delete Posts and Comments when number of reports reaches"
                      v-model="deletePostsWithReportCount"
                      :disabled="!isOrganizationOwner"
                      :rules="[v => parseInt(v) > 0 || 'must be a number > 0']"
                      :error-messages="errorResponse('deletePostsWithReportCount')"
                      ></v-text-field>

                    <v-layout>
                        <v-btn :disabled="!isOrganizationOwner" small @click="lockOrganization(!locked)" class="white--text"
                          :color="locked ? 'green' : 'red'">
                          {{ locked ? 'Unlock' : 'Lock to Members Only' }}
                        </v-btn>
                        <span  style="line-height:40px;padding-right:10px;color:#999">
                          <span v-if="lockedBy">
                            contributions locked to members only by @{{lockedBy}}
                          </span>
                          <span v-else>
                            anyone can post or comment
                          </span>
                        </span>
                    </v-layout>

                  </v-layout>
                </v-container>              
              </v-form>
            </v-card-title>
            <v-card-actions v-if="isOrganizationOwner" style="text-align:center">
              <v-layout>
                  <v-flex>
                      <v-btn large @click="done" title="Close (ESC)">Close</v-btn>
                  </v-flex>
                  <v-flex>
                      <v-btn large @click="submit" color="primary" :disabled="!valid || loading" title="Save (S)">Update Organization</v-btn>
                  </v-flex>
                  <v-flex xs1 style="margin:.5em -3em 0 3em">
                      <v-checkbox large label="confirm" v-model="allowDelete"></v-checkbox>
                  </v-flex>
                  <v-flex xs5>
                      <v-btn large @click="remove" :disabled="!allowDelete" color="red" class="white--text">
                        Delete Organization
                      </v-btn>                    
                  </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card>

        </v-flex>

        <v-flex style="text-align:center;margin-top:2em">
          <v-btn-toggle mandatory v-model="tab">
            <v-btn title="Labels (ALT+1)">
              Labels ({{ labels.length }})
            </v-btn>
            <v-btn title="Categories (ALT+2)">
              Categories ({{ categories.length }})
            </v-btn>
            <v-btn title="Members (ALT+3)">
              Members ({{ members.length }})
            </v-btn>
            <v-btn title="Member Invite Requests (ALT+4)">
              Invite Requests ({{ memberInvites.length }})
            </v-btn>
            <v-btn title="Reported Posts (ALT+5)">
              Reported Posts ({{ reportedPosts.length }})
            </v-btn>
            <v-btn title="Reported Comments (ALT+6)">
              Reported Comments ({{ reportedPostComments.length }})
            </v-btn>
          </v-btn-toggle>
        </v-flex>

        <v-flex v-if="tab==0">
          <v-card>
            <v-card-title>
              <v-layout column>
                <v-flex>
                  <v-card flat v-for="label in labels" :key="label.label">
                    <v-card-title style="margin:0;padding:0">
                      <v-layout>
                        <v-flex v-if="editLabel != label.slug">

                          <v-btn small fab dark color="pink" @click="editLabel = label.slug" title="Edit Label">
                            <v-icon dark>edit</v-icon>
                          </v-btn>

                          <em class="label" :style="labelStyle(label.slug)">{{ label.slug }}</em>

                          {{ label.description }}
                          
                        </v-flex>
                        <v-flex v-if="editLabel == label.slug">
                          <LabelEdit :label="label" @done="labelDone" />
                        </v-flex>
                      </v-layout>
                    </v-card-title>
                  </v-card>
                </v-flex>
                <v-flex v-if="addLabel">
                  <LabelEdit :orgId="id" @done="labelDone" />
                </v-flex>
              </v-layout>
            </v-card-title>

            <v-card-actions>
              <v-flex v-if="!addLabel && editLabel == null">
                <v-btn color="primary" @click="addLabel=true">Add Label</v-btn>
              </v-flex>
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-flex v-if="tab==1">
          <v-card>
            <v-card-title>
              <v-layout column>
                <v-flex>
                  <v-card flat v-for="category in categories" :key="category.id">
                    <v-card-title style="margin:0;padding:0">
                      <v-layout>
                        <v-flex v-if="editCategory != category.id">

                          <v-btn v-if="isOrganizationModerator" small fab dark color="pink" @click="editCategory = category.id" title="Edit Category">
                            <v-icon dark>edit</v-icon>
                          </v-btn>

                          {{ category.name }}
                          
                          <em class="tag">{{ category.slug }}</em>
                        </v-flex>
                        <v-flex v-if="editCategory == category.id">
                          <CategoryEdit :category="category" @done="categoryDone" />
                        </v-flex>
                      </v-layout>
                    </v-card-title>
                  </v-card>
                </v-flex>
                <v-flex v-if="addCategory">
                  <CategoryEdit :orgId="id" @done="categoryDone" />
                </v-flex>
              </v-layout>
            </v-card-title>

            <v-card-actions v-if="isOrganizationModerator">
              <v-flex v-if="!addCategory && editCategory == null">
                <v-btn color="primary" @click="addCategory=true">Add Category</v-btn>
              </v-flex>
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-flex v-if="tab==2">
          <v-card>
            <v-card-title>
              <v-layout column>
                <v-flex>
                  <v-card flat v-for="member in members" :key="member.id">
                    <v-card-title style="margin:0;padding:0">
                      <v-layout>
                        <v-flex v-if="editMember != member.id">

                          <v-btn v-if="isOrganizationModerator" small fab dark color="pink" @click="editMember = member.id" title="Edit Member"
                                 :disabled="(member.isOwner || member.isModerator) && !isOrganizationOwner">
                            <v-icon xsmall dark>edit</v-icon>
                          </v-btn>

                          {{ member.userName }}
                          <em v-if="member.isOwner" class="tag green">owner</em>
                          <em v-else-if="member.isModerator" class="tag blue">moderator</em>
                          
                          <em v-if="member.denyAll" class="tag red">deny-all</em>
                          <em v-if="member.denyPosts" class="tag red">deny-posts</em>
                          <em v-if="member.denyComments" class="tag red">deny-comments</em>
                        </v-flex>
                        <v-flex v-if="editMember == member.id">
                          <MemberEdit :orgId="id" :member="member" :isOrganizationOwner="isOrganizationOwner" @done="memberDone" />
                        </v-flex>
                      </v-layout>
                    </v-card-title>
                  </v-card>                  
                </v-flex>
                <v-flex v-if="addMember">
                  <MemberEdit :orgId="id" :isOrganizationOwner="isOrganizationOwner" @done="memberDone" />
                </v-flex>
              </v-layout>
            </v-card-title>

            <v-card-actions v-if="isOrganizationModerator">
              <v-flex v-if="!addMember && editMember == null">
                <v-btn color="primary" @click="addMember=true">Add Member</v-btn>
              </v-flex>
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-flex v-if="tab==3">
          <v-card>
            <v-card-title>
              <v-layout column>
                <v-flex>
                  <v-card flat v-for="member in memberInvites" :key="member.userName">
                    <v-card-title style="margin:0;padding:0">
                      <v-layout>
                        <v-flex>
                          <v-btn v-if="isOrganizationModerator && member.dismissed == null" small fab dark color="green" @click="updateInvite(member.userName,true)" title="Approve">
                            <v-icon xsmall dark>check</v-icon>
                          </v-btn>
                          <v-btn v-if="isOrganizationModerator && member.dismissed == null" small fab dark color="red" @click="updateInvite(member.userName,false)" title="Dismiss">
                            <v-icon xsmall dark>close</v-icon>
                          </v-btn>

                          {{ member.userName }} <em class="tag" v-if="member.dismissed">dismissed</em>
                        </v-flex>
                      </v-layout>
                    </v-card-title>
                  </v-card>
                  <v-alert color="info" icon="info" outline :value="memberInvites.length == 0">
                    No Member Invite Requests remaining
                  </v-alert>
                </v-flex>
              </v-layout>
            </v-card-title>
          </v-card>
        </v-flex>        

        <v-flex v-if="tab==4">
          <v-card>
            <v-card-title>
              <v-layout column>
                <v-flex>
                  <v-card flat v-for="report in reportedPosts" :key="report.id">
                    <v-card-title style="margin:0;padding:5px 0">
                      <v-layout>
                        <v-flex>
                          <div>
                            <nuxt-link :to="routes.post(report.postId,report.title)">{{ report.title }}</nuxt-link> 
                            by <nuxt-link :to="routes.user(report.createdBy)">@{{ report.createdBy }}</nuxt-link>
                          </div>
                          <div>
                            <v-btn small dark color="purple" @click="actionPostReport(report.id,report.postId,'Delete')" title="Approve" :disabled="loading">
                              Delete Post
                            </v-btn>
                            <v-btn small @click="actionPostReport(report.id,report.postId,'Dismiss')" title="Dismiss" :disabled="loading">
                              Dismiss
                            </v-btn>
                              total reports: <b>{{ report.reportCount }}</b>, this report from 
                              <nuxt-link :to="routes.user(report.userName)">@{{ report.userName }}</nuxt-link>:
                              <b> {{ report.flagType }} </b> <em>{{ report.reportNotes }}</em>
                          </div>
                        </v-flex>
                      </v-layout>
                    </v-card-title>
                  </v-card>
                  <v-alert color="info" icon="info" outline :value="reportedPosts.length == 0">
                    No Post Reports remaining
                  </v-alert>
                </v-flex>
              </v-layout>
            </v-card-title>
          </v-card>
        </v-flex>        

        <v-flex v-if="tab==5">
          <v-card>
            <v-card-title>
              <v-layout column>
                <v-flex>
                  <v-card flat v-for="report in reportedPostComments" :key="report.id">
                    <v-card-title style="margin:0;padding:5px 0">
                      <v-layout>
                        <v-flex>
                          <div>
                            <nuxt-link :to="routes.comment(report.postId,report.postCommentId)">{{ report.postCommentId }}</nuxt-link> 
                            by <nuxt-link :to="routes.user(report.createdBy)">@{{ report.createdBy }}</nuxt-link>
                            <div class="comment-content" v-html="report.contentHtml" style="border:1px solid #ccc;padding:0 10px;margin:5px 0"></div>
                          </div>
                          <div>
                            <v-btn small dark color="purple" @click="actionPostCommentReport(report.id,report.postCommentId,report.postId,'Delete')" title="Approve" :disabled="loading">
                              Delete Comment
                            </v-btn>
                            <v-btn small @click="actionPostCommentReport(report.id,report.postCommentId,report.postId,'Dismiss')" title="Dismiss" :disabled="loading">
                              Dismiss
                            </v-btn>
                              total reports: <b>{{ report.reportCount }}</b>, this report from 
                              <nuxt-link :to="routes.user(report.userName)">@{{ report.userName }}</nuxt-link>:
                              <b> {{ report.flagType }} </b> <em>{{ report.reportNotes }}</em>
                          </div>
                        </v-flex>
                      </v-layout>
                    </v-card-title>
                  </v-card>
                  <v-alert color="info" icon="info" outline :value="reportedPostComments.length == 0">
                    No Comment Reports remaining
                  </v-alert>
                </v-flex>
              </v-layout>
            </v-card-title>
          </v-card>
        </v-flex>        

      </v-layout>
      
  </div>
</template>

<script>
import CategoryEdit from "~/components/CategoryEdit.vue";
import MemberEdit from "~/components/MemberEdit.vue";
import LabelEdit from "~/components/LabelEdit.vue";
import Editor from "@servicestack/editor";

import { mapGetters } from "vuex";
import { toObject, errorResponse, errorResponseExcept } from "@servicestack/client";
import { routes } from "~/shared/routes";
import { getOrganizationBySlug, getOrganizationAdmin, updateOrganization, createCategory, deleteOrganization, lockOrganization, updateMemberInvite,
         actionPostReport, actionPostCommentReport } from "~/shared/gateway";
import { ignoreKeyPress, nameCounter, nameRules, slugCounter, slugRules, descriptionCounter, descriptionRulesOptional } from "~/shared/utils";
import { labelStyle } from "~/shared/post";

const organization = {
  id: null,
  name: "",
  slug: "",
  description: "",
  locked: null,
  lockedBy: null,
  disableInvites: false,
  defaultPostType: "",
  defaultSubscriptionPostTypes: [],
  postTypes: [],
  moderatorPostTypes: [],
  technologyIds: [],
  deletePostsWithReportCount: 5,
  lang: "",
};

export default {
  components: { CategoryEdit, MemberEdit, LabelEdit, Editor },
  props: ['orgSlug'],
  computed: {
    errorSummary(){ 
      return errorResponseExcept.call(this,Object.keys(organization));
    },
    member() {
      return this.userOrganizations && this.userOrganizations.members.find(x => x.organizationId == this.id);
    },
    isOrganizationOwner(){
      return this.isAdmin || (this.member && this.member.isOwner);
    },
    isOrganizationModerator(){
      return this.isOrganizationOwner || (this.member && this.member.isModerator);
    },
    langSelectItems(){
      return this.technologyTiers.filter(x => x.tier == 'ProgrammingLanguage').map(x => ({ text:x.name, value:x.name }))
    },
    ...mapGetters(["loading", "isAuthenticated", "isAdmin", "user", "organization", "userOrganizations", "technologyTiers", "allPostTypeSelectItems",
                   "getLangByOrganizationId"])
  },

  methods: {
    labelDone(changed) {
      this.editLabel = null;
      this.addLabel = false;
      if (changed) {
        this.loadOrgnaization();
      }
    },
    categoryDone(changed) {
      this.editCategory = null;
      this.addCategory = false;
      if (changed) {
        this.loadOrgnaization();
      }
    },
    memberDone(changed) {
      this.editMember = null;
      this.addMember = null;
      if (changed) {
        this.loadOrgnaization();
      }
    },
    
    async lockOrganization(lock) {
      await lockOrganization(this.id, lock);
      this.locked = this.lockedBy = null;
      this.loadOrgnaization();
    },

    async updateInvite(userName,approve) {
      try {
        this.$store.commit('loading', true);

        await updateMemberInvite(this.id, userName, approve);
        this.loadOrgnaization();
      } catch(e) {
          this.responseStatus = e.responseStatus || e;
      } finally {
          this.$store.commit('loading', false);
      }
    },

    async actionPostReport(id,postId,action) {
      try {
        this.$store.commit('loading', true);

        await actionPostReport(id, postId, action);
        this.loadOrgnaization();
      } catch(e) {
          this.responseStatus = e.responseStatus || e;
      } finally {
          this.$store.commit('loading', false);
      }      
    },

    async actionPostCommentReport(id,postCommentId,postId,action) {
      try {
        this.$store.commit('loading', true);

        await actionPostCommentReport(id, postCommentId, postId, action);
        this.loadOrgnaization();
      } catch(e) {
          this.responseStatus = e.responseStatus || e;
      } finally {
          this.$store.commit('loading', false);
      }      
    },

    async done() {
      this.$router.push(routes.organizationNews(this.orgSlug));
    },

    async remove() {
      try {
        this.$store.commit('loading', true);
        
        const response = await deleteOrganization(this.id);
        
        this.done();

      } catch(e) {
          this.responseStatus = e.responseStatus || e;
      } finally {
          this.$store.commit('loading', false);
      }
    },

    async submit() {
      if (this.$refs.form.validate()) {
          try {
            this.$store.commit('loading', true);
            
            const fields = toObject.call(this, Object.keys(organization));

            const response = await updateOrganization(fields);

            this.done();
            
          } catch(e) {
              this.responseStatus = e.responseStatus || e;
          } finally {
              this.$store.commit('loading', false);
          }
      }
    },
    async loadOrgnaization(){
      try {
        await this.$store.dispatch('loadOrganizationBySlug', this.orgSlug);
        Object.assign(this, this.organization);
        this.categories = this.organization.categories.filter(x => x.deleted == null);
        const response = await getOrganizationAdmin(this.id);
        this.labels = response.labels;
        this.members = response.members;
        this.memberInvites = response.memberInvites;
        this.reportedPosts = response.reportedPosts;
        this.reportedPostComments = response.reportedPostComments;
        this.$store.dispatch('loadUserOrganizations');
        this.responseStatus = null;
      } catch(e) {
        this.forbidden = e.responseStatus && e.responseStatus.errorCode === "Forbidden";
        this.responseStatus = e.responseStatus || e;
      }
    },

    handleKeyUp(e) {
      if (ignoreKeyPress(e)) return;
      const c = String.fromCharCode(e.keyCode).toLowerCase();
      if (e.key === "Escape" || e.keyCode === 27) {
        this.done();
      }
      else if (c === 's') {
        this.submit();
      }
      else if (e.altKey && (c >= '1' || c <= '5')) {
        this.tab = parseInt(c) - 1;
      }
    },

    labelStyle,
    errorResponse,
  },

  async mounted() {
    this.$store.dispatch('loadOverview');
    this.$store.dispatch('loadTechnologyTiers');
    this.loadOrgnaization();
    
    window.addEventListener('keyup', this.handleKeyUp);
  },

  destroyed(){
    window.removeEventListener('keyup', this.handleKeyUp);
  },

  data: () => ({
    forbidden:false,
    routes,
    ...organization,
    labels: [],
    categories: [],
    members: [],
    memberInvites: [],
    reportedPosts: [],
    reportedPostComments: [],
    tab: 0,
    addLabel: false,
    editLabel: null,
    addCategory: false,
    editCategory: null,
    addMember: false,
    editMember: null,
    valid: true,
    allowDelete: false,
    nameCounter, nameRules, slugCounter, slugRules, descriptionCounter, descriptionRulesOptional,
    responseStatus: null,
  }),

}
</script>
