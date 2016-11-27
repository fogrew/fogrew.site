const $ = require('./querySelector');

function Searcher(opts) {
  if( ! (this instanceof Searcher)) {
    return new Searcher(opts);
  }
  const self = this;

  const defaults = {
    form : '.search',
    input : '.find',
    tags : '.label',
    reset : '.reset',
    grid: '.grid',
    box : '.box',
    spinner: '.spinner'
  };
  self.options = Object.assign(defaults, opts);

  /**
   * Return text from KeyboardEvent on input
   * @param  {event} KeyboardEvent should be 'keyup'
   * @return {string|null}
   */
  self.filter = function(KeyboardEvent) {
    return self.filterResults(this.value.toLowerCase(), self.options.box);
  };

  /**
   * Reset form
   */
  self.resetForm = function() {
    $(self.options.form).reset();
    $(self.options.box).forEach(item => item.style.display = 'flex');
    $(self.options.input).focus();
  }


  /**
   * Return boolean after check string as URL
   * @param  {string}  url sould be string
   * @return {boolean} value HZ
   * @example
   * // returns true
   * isValidURL('https://google.com/')
   */
  self.isValidURL = function(url) {
    let link = document.createElement('a');
    link.href = url;

    return link.origin !== window.location.origin;
  }

  /**
   * Send form or any other action
   * @param {event} event may be click or any other event
   */
  self.submitForm = function(event) {
    let value = $(self.options.input).value;

    let engines = [
      {
        short: 'y',
        name: 'Yandex',
        link: 'https://yandex.ru/yandsearch?text='
      },
      {
        short: 'g',
        name: 'Google',
        link: 'https://www.google.com/search?q='
      },
      {
        short: 'd',
        name: 'DuckDuckGo',
        link: 'https://duckduckgo.com/?q='
      },
      {
        short: 'w',
        name: 'WikiPedia',
        link: 'https://ru.wikipedia.org/wiki/?search='
      },
      {
        short: 'm',
        name: 'Yandex Market',
        link: 'https://market.yandex.ru/search.xml?text='
      },
      {
        short: 'music',
        name: 'Yandex Music',
        link: 'https://music.yandex.ru/search?text='
      },
      {
        short: 'caniuse',
        name: 'CanIUse',
        link: 'http://caniuse.com/#search='
      },
      {
        short: 'gh',
        name: 'GitHub',
        link: 'https://github.com/search?q='
      },
      {
        short: 'gt',
        name: 'Google Translate',
        link: 'http://translate.google.ru/?source=osdd#auto|auto|'
      },
      {
        short: 'icon',
        name: 'IconFinder',
        link: 'https://www.iconfinder.com/search/?q='
      },
      {
        short: 'mactorrent',
        name: 'MacTorrent',
        link: 'http://www.mac-torrent-download.net/?s='
      },
      {
        short: 'nnm',
        name: 'NoName Club',
        link: 'http://nnm-club.ru/forum/search.php?mode=results&show_results=topics&search_keywords='
      },
      {
        short: 'rutracker',
        name: 'Rutracker',
        link: 'https://rutracker.org/forum/tracker.php?max=1&nm='
      },
      {
        short: 'html',
        name: 'htmlbook',
        link: 'http://htmlbook.ru/sites/search/?q='
      },
      {
        short: 'vk',
        name: 'vk',
        link: 'https://vk.com/search?q='
      }
    ];

    event.preventDefault();

    if(self.isValidURL(value)) {
      window.location = value;
    }

    engines.forEach(engine => {
      // TODO: split with space array of value. first word = searcher. if doesnt searcher then question about add;
      let firstWord = value.substr(0, engine.short.length + 1);
      let text = value.substr(value.indexOf(engine.short)+1 + engine.short.length);

      if(engine.short + ' ' == firstWord) {
        window.location = engine.link + text;
      }
    });
  }

  /**
   * Return and select tag from click event;
   * @param  {event} event may be click or any other event
   */
  self.selectTag = function(event) {
    let target = event.target;
    let tag = target.innerHTML;

    // disable click to empty place
    if(!target.classList.contains('tag')) {
      return;
    }

    $(self.options.input).value = tag;
    self.filterResults(tag, self.options.box);
    return tag;
  }

  /**
   * [filterResults description]
   * @param  {string} query any symbols
   * @return {array} HTMLCollection
   */
  self.filterResults = function(query, el) {
    let results = [];

    if(!el) {
      return;
    }

    if(!query) {
      $(el).forEach(item => item.style.display = 'flex');
    } else {
      $(el).forEach(item => {
        let boxTags = item.dataset.tags;
        boxTags = boxTags ? boxTags.trim() : '';
        // var selector = el + '[data-tags=' + boxTags + ']'
        // var CSSrule = '{display:none}';
        // var css = selector + ' ' + CSSrule;

        item.style.display = 'none';
        if(boxTags) {
          boxTags.split(' ').forEach(tag => {
            if (tag.match(query)) {
              item.style.display = 'flex';
              results.push(item);
            }
          });
        }
      });
    }
    return results;
  }

  /**
   * [addStyleTag description] TODO: toggle boxes with css
   */
  self.addStyleTag = function(content) {
    this.styleTag = document.createElement('style');
    document.head.appendChild(styleTag);
  }

  /**
   * Add load spinner over icon
   * @param  {event} KeyboardEvent should be 'click'
   */
  self.addLoader = function(eventClick) {
    let box = eventClick.target.closest('.box');
    let spinner = $(self.options.spinner);

    let left = box.offsetLeft + box.offsetWidth / 2 + 'px';
    let top = box.offsetTop + box.offsetHeight / 2 + 'px';

    spinner.style.display = 'block';
    spinner.style.left = left;
    spinner.style.top = top;
  }

  $(self.options.form).addEventListener('submit', self.submitForm);
  $(self.options.input).addEventListener('keyup', self.filter);
  $(self.options.grid).addEventListener('click', self.addLoader);
  $(self.options.tags).addEventListener('click', self.selectTag);
  $(self.options.reset).addEventListener('click', self.resetForm);

  return (`${self.options.form}, ${self.options.input}, ${self.options.tags}, ${self.options.reset}, ${self.options.box}`);
}

module.exports = Searcher;
