//@ sourceMappingURL=highlights.map
// Generated by CoffeeScript 1.6.1
(function() {

  jQuery(function() {
    var createPopus, makeGlossary, popByTerm, toId;
    window.jQuery.fn.regHighlight = function(term, regex, description) {
      /*
          jQuery extension to highlight something inside the element.
      */

      var $terms, id, parts;
      id = toId(term);
      parts = this.contents().filter(function() {
        return this.nodeType === 3 && regex.test(this.nodeValue);
      });
      parts.replaceWith(function() {
        return (this.nodeValue || "").replace(regex, function(match) {
          return "<code class=\"" + id + "\">" + match + "</code>";
        });
      });
      $terms = this.find("." + id);
      $terms.mouseover(function(event) {
        var $pop;
        $pop = popByTerm(term);
        $pop.position();
        $pop.css("left", $(this).position().left + 20);
        $pop.css("top", $(this).position().top + $(this).height());
        return $pop.show();
      });
      return $terms.mouseout(function(event) {
        return popByTerm(term).hide();
      });
    };
    makeGlossary = function(dic) {
      /*
          Transfors ordniary JavaScript object with key-value-pairs
          to more appropriate format with description.
      */

      var key, res, val;
      res = {};
      for (key in dic) {
        val = dic[key];
        res[key] = {
          term: key,
          description: val,
          regex: new RegExp(key, "gi")
        };
      }
      return res;
    };
    toId = function(term) {
      return "pop_" + term.replace(" ", "_");
    };
    popByTerm = function(term) {
      return $("#pop_" + toId(term));
    };
    createPopus = function(gloss) {
      var doc, key, pid, val, _results;
      doc = $("body");
      _results = [];
      for (key in gloss) {
        val = gloss[key];
        pid = "pop_" + toId(val.term);
        doc.append("<div class='popup' id=\"" + pid + "\"><b>" + val.term + ":</b> " + val.description + "</div>");
        _results.push($("#" + pid).hide());
      }
      return _results;
    };
    window.jQuery.fn.annotate = function(dic) {
      /*
          Dictionary consists of terms and annotations.
      */

      var gloss;
      gloss = makeGlossary(dic);
      createPopus(gloss);
      return this.each(function(index, element) {
        var $el, key, val, _results;
        $el = $(element);
        _results = [];
        for (key in gloss) {
          val = gloss[key];
          _results.push($el.regHighlight(val.term, val.regex, val.description));
        }
        return _results;
      });
    };
    return window.jQuery.fn.annotateTerm = function(str, description) {
      /*
          Annotating extension, use it for every tag you want
      */

      var regex;
      regex = new RegExp(str, "gi");
      return this.each(function(index, element) {
        return $(element).regHighlight(str, regex, description);
      });
    };
  });

}).call(this);
