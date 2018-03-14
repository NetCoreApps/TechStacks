<template>
  <div class="editor">
      <div class="editor-toolbar">
        <v-btn small icon @click="bold" title="Bold text (CTRL+B)"><v-icon>format_bold</v-icon></v-btn>
        <v-btn small icon @click="italic" title="Italics (CTRL+I)"><v-icon>format_italic</v-icon></v-btn>
        <v-btn small icon @click="link" title="Insert Link (CTRL+L)"><v-icon>insert_link</v-icon></v-btn>
        <v-btn small icon @click="quote" title="Blockquote (CTRL+Q)"><v-icon>format_quote</v-icon></v-btn>
        <v-btn small icon @click="image" title="Insert Image (CTRL+SHIFT+L)"><v-icon>insert_photo</v-icon></v-btn>
        <v-btn small icon @click="code" title="Insert Code (CTRL+<)"><v-icon>code</v-icon></v-btn>
        <v-btn small icon @click="ol" title="Numbered List"><v-icon>format_list_numbered</v-icon></v-btn>
        <v-btn small icon @click="ul" title="Bulleted List"><v-icon>format_list_bulleted</v-icon></v-btn>
        <v-btn small icon @click="heading" title="H2 Heading (CTRL+H)"><v-icon>format_size</v-icon></v-btn>
        <v-btn small icon @click="strikethrough" title="Strike Through"><v-icon>format_strikethrough</v-icon></v-btn>
        <v-btn small icon @click="undo" title="undo (CTRL+Z)"><v-icon>undo</v-icon></v-btn>
        <v-btn small icon @click="redo" title="redo (CTRL+SHIFT+Z)"><v-icon>redo</v-icon></v-btn>
        <v-btn small icon @click="save" title="Save (CTRL+S)"><v-icon>save</v-icon></v-btn>
        <a class="btn btn--icon btn--small" style="float:right" title="formatting help" target="_blank" href="https://guides.github.com/features/mastering-markdown/">
          <v-icon>help_outline</v-icon>
        </a>
      </div>
      <v-text-field ref="txt"
        :label="label"
        :value="value"
        :spellcheck="!value || value.indexOf('```')===-1"
        :counter="counter"
        multi-line
        auto-grow
        :rows="rows || 6"
        :rules="rules"
        :error-messages="errorMessages"    
        @input="v => $emit('input',v)"
        @keydown.tab="tab"
        ></v-text-field>
  </div>  
</template>

<script>

let history = [];
let redo = [];

var ops = {
  input(){
    return this.$refs.txt.$refs.input;
  },
  hasSelection(){
    return this.input().selectionStart != this.input().selectionEnd;
  },
  selection(){
    const $txt = this.input();
    return $txt.value.substring($txt.selectionStart, $txt.selectionEnd) || '';
  },
  selectionInfo(){
    const $txt = this.input();
    const value = $txt.value, selPos = $txt.selectionStart, sel = value.substring(selPos, $txt.selectionEnd) || '', 
          beforeSel = value.substring(0,selPos), prevCRPos = beforeSel.lastIndexOf('\n');
    return { 
      value,
      sel,
      selPos,
      beforeSel,
      afterSel: value.substring(selPos),
      prevCRPos,
      beforeCR: prevCRPos >= 0 ? beforeSel.substring(0,prevCRPos + 1) : '',
      afterCR: prevCRPos >= 0 ? beforeSel.substring(prevCRPos + 1) : '',
    };
  },
  replace({ value, selectionStart, selectionEnd }) {
    if (selectionEnd == null) {
      selectionEnd = selectionStart;
    }
    const $txt = this.input();
    this.$emit('input', value);
    this.$nextTick(() => {
      $txt.focus();
      $txt.setSelectionRange(selectionStart, selectionEnd);
    });
  },
  insert(prefix,suffix,placeholder, { selectionAtEnd, offsetStart, offsetEnd, filterValue, filterSelection }={}){
    const $txt = this.input();

    let value = $txt.value;
    let pos = $txt.selectionEnd;
    history.push({ value, selectionStart:$txt.selectionStart, selectionEnd:$txt.selectionEnd });
    redo = [];
    const from = $txt.selectionStart, to = $txt.selectionEnd, len = to - from;
    let beforeRange = value.substring(0,from);
    let afterRange = value.substring(to);
    const toggleOff = prefix && suffix && beforeRange.endsWith(prefix) && afterRange.startsWith(suffix);

    if (from == to) {
      if (!toggleOff) {
        value = beforeRange + prefix + placeholder + suffix + afterRange;
        pos += prefix.length;
        offsetEnd = placeholder.length;
        if (selectionAtEnd) {
          pos += offsetEnd;
          offsetEnd = 0;
        }
      } else {
        value = beforeRange.substring(0, beforeRange.length - prefix.length) + afterRange.substring(suffix.length);
        pos += -suffix.length;  
      }
      if (filterValue) {
        var opt = { pos };
        value = filterValue(value, opt);
        pos = opt.pos;
      }
    } else {
      var selectedText = value.substring(from,to);
      if (filterSelection) {
        selectedText = filterSelection(selectedText);
      }

      if (!toggleOff) {
        value = beforeRange + prefix + selectedText + suffix + afterRange;

        if (offsetStart) {
          pos += (prefix + suffix).length;
        } else {
          pos = from;
          offsetStart = prefix.length;
          offsetEnd = selectedText.length;
        }
      } else {
        value = beforeRange.substring(0, beforeRange.length - prefix.length) + selectedText + afterRange.substring(suffix.length);
        offsetStart = -selectedText.length-prefix.length;
        offsetEnd = selectedText.length;
      }
    }
    this.$emit('input', value);
    this.$nextTick(() => {
      $txt.focus();
      offsetStart = pos + (offsetStart || 0);
      offsetEnd = offsetStart + (offsetEnd || 0);
      $txt.setSelectionRange(offsetStart,offsetEnd);
    });
  },
  bold(){
    this.insert('**','**','bold')
  },
  italic(){
    this.insert('_','_','italics')
  },
  strikethrough(){
    this.insert('~~','~~','strikethrough')
  },
  link(){
    this.insert('[','](http://)','', { offsetStart:-8, offsetEnd:7 })
  },
  quote(){
    this.insert('\n\n> ','\n\n','Blockquote', {  })
  },
  image(){
    this.insert('![','](http://)','alt text', { offsetStart:-8, offsetEnd:7 })
  },
  code(e){
    if (this.hasSelection() && !e.shiftKey) {
      this.insert('`','`','code')
    } else {
      const lang = this.lang || 'js'
      this.insert('\n```' + lang + '\n','\n```\n','// code')
    }
  },
  ol(){    
    if (this.hasSelection()) {
      this.insert('\n\n 1. ','\n\n')
    } else {
      this.insert('\n 1. ','\n','List Item', { offsetStart:-10, offsetEnd:9 })
    }
  },
  ul(){    
    if (this.hasSelection()) {
      this.insert('\n\n - ','\n\n')
    } else {
      this.insert('\n - ','\n','List Item', { offsetStart:-10, offsetEnd:9 })
    }
  },
  heading(){
    if (this.hasSelection()) {
      this.insert('\n## ','\n\n','')
    } else {
      this.insert('\n## ','\n','Heading', { offsetStart:-8, offsetEnd:7 })
    }
  },
  comment(){
    let { sel, selPos, beforeSel, afterSel, prevCRPos, beforeCR, afterCR } = this.selectionInfo();
    const comment = !sel.startsWith('//') && !afterCR.startsWith('//');
    if (comment) {
      if (!sel) {
        this.replace({ 
          value: beforeCR + '//' + afterCR + afterSel,
          selectionStart: selPos + '//'.length
        });
      } else {
        this.insert('','','//', { 
          selectionAtEnd: true,
          filterSelection: v => "//" + v.replace(/\n$/,'').replace(/\n/g,"\n//") + "\n" 
        });
      }
    } else {
      this.insert('','','', {
        filterValue:(v,opt) => {
          if (prevCRPos >= 0) {
            let afterCRTrim = afterCR.replace(/^\/\//,'');
            beforeSel = beforeCR + afterCRTrim;
            opt.pos -= afterCR.length - afterCRTrim.length;
          }
          return beforeSel + afterSel;
        }, 
        filterSelection: v => v.replace(/^\/\//g,'').replace(/\n\/\//g,"\n") 
      });
    }
  },
  undo(){
    if (history.length == 0) return false;
    const $txt = this.input();
    var lastState = history.pop();
    redo.push({ value:$txt.value, selectionStart:$txt.selectionStart, selectionEnd:$txt.selectionEnd });
    this.replace(lastState);
    return true;
  },
  redo(){    
    if (redo.length == 0) return false;
    const $txt = this.input();
    var lastState = redo.pop();
    history.push({ value:$txt.value, selectionStart:$txt.selectionStart, selectionEnd:$txt.selectionEnd });
    this.replace(lastState);
    return true;
  },
}

export default {
  props: ['label','value','counter','rows','rules','errorMessages','lang'],

  methods: {
    save(){
      this.$emit('save');
    },
    ...ops
  },

  mounted(){
    history = [], redo = [];
    const $txt = this.$refs.txt.$refs.input;
    $txt.onkeydown = (e) => {
      if (e.key === "Escape" || e.keyCode === 27) {
        this.$emit('close');
        return;
      }
      
      const c = String.fromCharCode(e.keyCode).toLowerCase();
      if (c === '\t') { //tab: indent/unindent
        const indent = !e.shiftKey;
        if (indent) {
          this.insert('','','    ', { 
            selectionAtEnd: true,
            filterSelection: v => "    " + v.replace(/\n$/,'').replace(/\n/g,"\n    ") + "\n" 
          });
        } else {
          this.insert('','','', { 
            filterValue:(v,opt) => {
              let { selPos, beforeSel, afterSel, prevCRPos, beforeCR, afterCR } = this.selectionInfo();
              if (prevCRPos >= 0) {
                let afterCRTrim = afterCR.replace(/^ ? ? ? ?/,'');
                beforeSel = beforeCR + afterCRTrim;
                opt.pos -= afterCR.length - afterCRTrim.length;
              }
              return beforeSel + afterSel;
            }, 
            filterSelection: v => v.replace(/^ ? ? ? ?/g,'').replace(/\n    /g,"\n") 
          });
        }
        e.preventDefault();
      } 
      else if (e.ctrlKey) 
      {
        if (c === 'z') { //z: undo/redo
          if (!e.shiftKey) {
            if (this.undo()) {
              e.preventDefault();
            }
          } else {
            if (this.redo()) {
              e.preventDefault();
            }
          }
        } else if (c === 'b' && !e.shiftKey) { //b: bold
          this.bold();
          e.preventDefault();
        } else if (c === 'h' && !e.shiftKey) { //h: heading
          this.heading();
          e.preventDefault();
        } else if (c === 'i' && !e.shiftKey) { //i: italic
          this.italic();
          e.preventDefault();
        } else if (c === 'q' && !e.shiftKey) { //q: blockquote
          this.quote();
          e.preventDefault();
        } else if (c === 'l') { //l: link/image
          if (!e.shiftKey) {
            this.link();            
            e.preventDefault();
          } else {
            this.image();            
            e.preventDefault();
          }
        } else if ((c === ',' || e.key === '<' || e.keyCode === 188)) { //<>: code
          this.code(e);
          e.preventDefault();
        } else if (c === 's' && !e.shiftKey) { //s: save
          this.save();
          e.preventDefault();
        } else if (c === '/' || e.key === '/') {
          this.comment();
        }
      }
    }
  },
  
  data: () =>({
  })
};
</script>

<style>
.editor-toolbar {
  margin-top: 10px;
  border: 1px solid rgba(0,0,0,.2);
}
.editor textarea, .monospace {
  font-size: 15px;
  font-family: Consolas, Monaco, Inconsolata, Menlo, monospace, "Lucida Console"
}
</style>
