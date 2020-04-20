const app = new Vue({
  el: '#app',
  data: function () {
    return {
      notes: [],
      active: null,
    };
  },
  methods: {
    remove: function() {
      for (let i in this.notes) {
        if (this.notes[i].content === '') {
          this.notes.splice(i, 1);
          this.active = null;
        }
      }

      window.localStorage.setItem('notes', JSON.stringify(this.notes));
    },

    create: function () {
      this.active = null;
      this.$refs.textarea.value = '';
      this.remove();
    },

    select: function (key) {
      this.active = key;
      this.$refs.textarea.value = this.notes[key].content;
    },

    save: _.debounce(function () {
        let data = this.$refs.textarea.value;

        let notes = JSON.parse(window.localStorage.getItem('notes') || '[]');
  
        if (this.active === null) {
          notes.splice(0, 0, {
            content: data,
          });
        }
        else {
          notes[this.active].content = data;
        }
  
        this.notes = notes;
  
        if (this.active === null) {
          this.select(0);
        }
  
        this.remove();

        window.localStorage.setItem('notes', JSON.stringify(this.notes));
    }, 300),
  },
  mounted() {
    this.notes = JSON.parse(window.localStorage.getItem('notes') || '[]');
  },
});