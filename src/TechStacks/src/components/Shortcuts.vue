<template>
  <div id="dialog" class="shortcuts dark">
    <div class="dialog" style="max-width:700px">
      <div class="dialog-header">
          <i class="material-icons close" @click="close">close</i>
          Keyboard shortcuts
      </div>
      <div class="dialog-body">
        <table>
          <tr>
            <td style="vertical-align:top">

              <table>
                <tbody>
                    <tr>
                        <td></td>
                        <td><h4>Global Shortcuts</h4></td>
                    </tr>
                    <tr>
                        <th><span>1</span><i>:</i></th>
                        <td>Home (Alias H)</td>
                    </tr>
                    <tr>
                        <th><span>2</span><i>:</i></th>
                        <td>Top</td>
                    </tr>
                    <tr>
                        <th><span>3</span><i>:</i></th>
                        <td>Stacks</td>
                    </tr>
                    <tr>
                        <th><span>4</span><i>:</i></th>
                        <td>Technologies</td>
                    </tr>
                    <tr>
                        <th><span>5</span><i>:</i></th>
                        <td>Favorites</td>
                    </tr>
                    <tr>
                        <th><span>6</span><i>:</i></th>
                        <td>User Profile</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><h4>Page Shortcuts</h4></td>
                    </tr>
                    <tr>
                        <th><span> N </span><i>:</i></th>
                        <td>New</td>
                    </tr>
                    <tr>
                        <th><span> E </span><i>:</i></th>
                        <td>Edit</td>
                    </tr>
                    <tr>
                        <th><span> S </span><i>:</i></th>
                        <td>Save</td>
                    </tr>
                    <tr>
                        <th><span> F </span><i>:</i></th>
                        <td>Favorite</td>
                    </tr>
                    <tr>
                        <th><span> P </span><i>:</i></th>
                        <td>Report</td>
                    </tr>
                    <tr>
                        <th><span> C </span><i>:</i></th>
                        <td>Comment</td>
                    </tr>
                    <tr>
                        <th><span> ← / → </span><i>:</i></th>
                        <td>Prev / Next Results</td>
                    </tr>
                    <tr>
                        <th>
                            <b>ESC</b>
                            <i>:</i>
                        </th>
                        <td>
                            Close
                        </td>
                    </tr>
                </tbody>
              </table>

            </td>
            <td style="vertical-align:top">

              <table>
                <tbody>
                    <tr>
                        <td></td>
                        <td><h4>Tab Shortcuts</h4></td>
                    </tr>
                    <tr>
                      <th>
                        <b>ALT</b>
                        <span> + </span>
                        <b>1-9</b>
                      </th>
                      <td>Page Tabs 1-9</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><h4>Markdown Shortcuts</h4></td>
                    </tr>
                    <tr>
                      <th>
                        <b>CTRL</b>
                        <span> + </span>
                        <b>B</b>
                      </th>
                      <td>Bold</td>
                    </tr>
                    <tr>
                      <th>
                        <b>CTRL</b>
                        <span> + </span>
                        <b>I</b>
                      </th>
                      <td>Italics</td>
                    </tr>
                    <tr>
                      <th>
                        <b>CTRL</b>
                        <span> + </span>
                        <b>L</b>
                      </th>
                      <td>Insert Link</td>
                    </tr>
                    <tr>
                      <th>
                        <b>CTRL</b>
                        <span> + </span>
                        <b>SHIFT</b>
                        <span> + </span>
                        <b>L</b>
                      </th>
                      <td>Insert Image</td>
                    </tr>
                    <tr>
                      <th>
                        <b>CTRL</b>
                        <span> + </span>
                        <b>&lt;</b>
                      </th>
                      <td>Insert Code</td>
                    </tr>
                    <tr>
                      <th>
                        <b>CTRL</b>
                        <span> + </span>
                        <b>SHIFT</b>
                        <span> + </span>
                        <b>&lt;</b>
                      </th>
                      <td>Insert Code Block</td>
                    </tr>
                    <tr>
                      <th>
                        <b>CTRL</b>
                        <span> + </span>
                        <b>H</b>
                      </th>
                      <td>H2 Heading</td>
                    </tr>
                    <tr>
                      <th>
                        <b>ALT</b>
                        <span> + </span>
                        <b>1</b>
                      </th>
                      <td>Numbered List</td>
                    </tr>
                    <tr>
                      <th>
                        <b>ALT</b>
                        <span> + </span>
                        <b>-</b>
                      </th>
                      <td>Unordered List</td>
                    </tr>
                    <tr>
                      <th>
                        <b>CTRL</b>
                        <span> + </span>
                        <b>Z</b>
                      </th>
                      <td>Undo</td>
                    </tr>
                    <tr>
                      <th>
                        <b>CTRL</b>
                        <span> + </span>
                        <b>SHIFT</b>
                        <span> + </span>
                        <b>Z</b>
                      </th>
                      <td>Redo</td>
                    </tr>
                    <tr>
                      <th>
                        <b>CTRL</b>
                        <span> + </span>
                        <b>S</b>
                      </th>
                      <td>Save</td>
                    </tr>
                    <tr>
                      <th>
                        <b>CTRL</b>
                        <span> + </span>
                        <b>/</b>
                      </th>
                      <td>Comment</td>
                    </tr>
                    <tr>
                      <th>
                        <b>CTRL</b>
                        <span> + </span>
                        <b>SHIFT</b>
                        <span> + </span>
                        <b>/</b>
                      </th>
                      <td>Block Comment</td>
                    </tr>

                </tbody>
              </table>


            </td>
          </tr>
        </table>

        </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    close(){
      this.$store.commit('showDialog', null);
    }
  },

  mounted() {},

  data: () => ({})
};
</script>

<style>
#dialog {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 10;
  top: 0;
  text-align: center;
}
.dialog {
  position: relative;
  top: 50px;
  text-align: left;
  display: inline-block;
  background: #fff;

  -webkit-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding-box;
  background-clip: padding-box;

}
.dialog-header {
  font-size: 18px;
  background: #0371be;
  color: #fff;
  padding: 12px;
}
.dialog-body {
  padding: 24px;
  min-height: 100px;
  color: #444;
}
.dialog-footer {
  text-align: right;
  padding: 12px;
}
.dialog-header .close {
  float: right;
  font-size: 16px;
  cursor: pointer;
}
.dialog-header .close:hover {
  color: #ddd;
}
.dialog-body .row {
  margin: 0 0 10px 0;
}
.dialog-body label {
  display: inline-block;
  padding: 0 20px 0 0;
  width: 100px;
}
.dialog-body input[type="text"] {
  width: 350px;
  padding: 8px 12px;
  font-size: 16px;
  border: solid 1px #a9a9a9;
}
.dialog .loading {
  visibility: hidden;
}
.dialog.disabled .loading {
  visibility: visible;
}
.dialog .info-help {
  cursor: pointer;
  color: #2a6496;
  margin: -12px -12px 0 0;
}
#dialog.dark {
  background: none;
}
#dialog.dark .dialog {
  background: rgba(0, 0, 0, 0.85);
  border-radius: 20px;
}
#dialog.dark .dialog-header {
  background: none;
  margin: 0 0 0 10px;
  font-weight: bold;
}
#dialog.dark .dialog-body {
  color: #fff;
  min-width: 400px;
  line-height: 20px;
}
#dialog.dark .dialog-body > table {
  margin: 0 0 20px 10px;
}
#dialog.dark .dialog-body h4 {
  padding: 15px 0 5px 0;
  color: #dd0;
  font-weight: bold;
}
#dialog.dark .dialog-body th {
  text-align: right;
}
#dialog.dark .dialog-body th b {
  font-family: "Courier New";
  font-size: 13px;
  color: #dd0;
  font-weight: bold;
}
#dialog.dark .dialog-body th i {
  font-family: arial;
  font-style: normal;
  font-weight: bold;
  padding: 0 10px 0 3px;
}

#dialog a,
#dialog .lnk,
.lnk {
  color: #428bca;
  text-decoration: none;
  cursor: pointer;
}
#dialog a:hover,
#dialog .lnk:hover,
.lnk:hover {
  color: #2a6496;
}
</style>
