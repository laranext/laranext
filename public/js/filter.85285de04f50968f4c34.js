(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["filter"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/themes/default/filters/SelectFilter.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/themes/default/filters/SelectFilter.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var Store_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Store/index */ "./resources/js/stores/index.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    name: String,
    filter: Object
  },
  setup: function setup(_ref) {
    var name = _ref.name,
        filter = _ref.filter;

    var _useIndexStore = Object(Store_index__WEBPACK_IMPORTED_MODULE_0__["useIndexStore"])(name)(),
        index = _useIndexStore.state,
        fetch = _useIndexStore.fetch,
        setAppliedFilter = _useIndexStore.setAppliedFilter;

    function onChange() {
      setAppliedFilter(filter);
      fetch();
    }

    return {
      index: index,
      onChange: onChange
    };
  }
});

/***/ }),

/***/ "./node_modules/debounce/index.js":
/*!****************************************!*\
  !*** ./node_modules/debounce/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear' 
 * that is a function which will clear the timer to prevent previously scheduled executions. 
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */
function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  };

  var debounced = function(){
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  
  debounced.flush = function() {
    if (timeout) {
      result = func.apply(context, args);
      context = args = null;
      
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
};

// Adds compatibility for ES modules
debounce.debounce = debounce;

module.exports = debounce;


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/themes/default/filters/SelectFilter.vue?vue&type=template&id=4bfd41ed&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/themes/default/filters/SelectFilter.vue?vue&type=template&id=4bfd41ed& ***!
  \***************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "h3",
      {
        staticClass:
          "text-sm uppercase tracking-wide text-gray-600 bg-gray-200 p-3"
      },
      [_vm._v(_vm._s(_vm.filter.name))]
    ),
    _vm._v(" "),
    _c("div", { staticClass: "p-2" }, [
      _c(
        "select",
        {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.index.params[_vm.filter.attribute],
              expression: "index.params[filter.attribute]"
            }
          ],
          staticClass: "block w-full form-select",
          on: {
            change: [
              function($event) {
                var $$selectedVal = Array.prototype.filter
                  .call($event.target.options, function(o) {
                    return o.selected
                  })
                  .map(function(o) {
                    var val = "_value" in o ? o._value : o.value
                    return val
                  })
                _vm.$set(
                  _vm.index.params,
                  _vm.filter.attribute,
                  $event.target.multiple ? $$selectedVal : $$selectedVal[0]
                )
              },
              _vm.onChange
            ]
          }
        },
        [
          _c("option", { attrs: { value: "", selected: "selected" } }, [
            _vm._v("—")
          ]),
          _vm._v(" "),
          _vm._l(_vm.filter.options, function(option, index) {
            return _c(
              "option",
              { key: index, domProps: { value: option.value } },
              [
                _vm._v(
                  "\n                " + _vm._s(option.name) + "\n            "
                )
              ]
            )
          })
        ],
        2
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/stores/index.js":
/*!**************************************!*\
  !*** ./resources/js/stores/index.js ***!
  \**************************************/
/*! exports provided: useIndexStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useIndexStore", function() { return useIndexStore; });
/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debounce */ "./node_modules/debounce/index.js");
/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debounce__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var pinia__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pinia */ "./node_modules/pinia/dist/pinia.esm.js");


var useIndexStore = function useIndexStore(name) {
  return Object(pinia__WEBPACK_IMPORTED_MODULE_1__["createStore"])({
    id: 'index-' + name,
    state: function state() {
      return {
        config: {},
        loading: false,
        items: [],
        selected: [],
        meta: {},
        defaultOrderBy: 'id',
        actions: [],
        filters: [],
        appliedFilters: [],
        params: {
          page: 1,
          search: null,
          searchColumn: 'name',
          searchNumericColumn: 'id',
          orderBy: 'id',
          orderByDirection: 'desc'
        }
      };
    },
    getters: {
      isCardTopbar: function isCardTopbar(_ref) {
        var config = _ref.config;
        return !config.noSelect || !config.noFilters || !config.noActions;
      },
      isSelectAll: function isSelectAll(state) {
        return state.items.length == state.selected.length;
      }
    },
    actions: {
      setConfig: function setConfig(config) {
        this.state.config = config;
        this.state.config.uri = this.setUri(config.route);
        this.state.config.baseUri = this.baseUri(config.route);
      },
      setUri: function setUri(route) {
        if (App.key && route) {
          return App.key + '/' + route;
        } else if (App.key) {
          return App.key;
        } else {
          return route;
        }
      },
      baseUri: function baseUri(segment) {
        var prefix = App.adminPrefix,
            key = App.key,
            uri = '/',
            route = segment.split('?')[0];

        if (prefix && key) {
          uri += route ? prefix + '/' + key + '/' + route : prefix + '/' + key;
        } else if (prefix) {
          uri += route ? prefix + '/' + route : prefix;
        } else {
          uri += route ? key + '/' + route : key;
        }

        return uri;
      },
      onSearch: debounce__WEBPACK_IMPORTED_MODULE_0___default()(function () {
        this.fetch();
      }, 250),
      selectAll: function selectAll() {
        var items = [];

        if (!this.isSelectAll.value) {
          for (var key in this.state.items) {
            items.push(this.state.items[key].id);
          }
        }

        this.state.selected = items;
      },
      sort: function sort(_ref2) {
        var attribute = _ref2.attribute,
            sortable = _ref2.sortable;
        if (!sortable) return;
        var orderBy = this.state.params.orderBy,
            direction = this.state.params.orderByDirection;

        if (orderBy == attribute && direction == 'asc') {
          this.state.params.orderByDirection = 'desc';
        } else if (orderBy == attribute && direction == 'desc') {
          this.state.params.orderBy = this.state.defaultOrderBy;
          this.state.params.orderByDirection = 'desc';
        } else {
          this.state.params.orderBy = attribute;
          this.state.params.orderByDirection = 'asc';
        }

        this.fetch();
      },
      deleteItems: function deleteItems(items) {
        var _this = this;

        console.log('Delete Items: ');
        console.log(items);
        return new Promise(function (resolve, reject) {
          axios["delete"]("".concat(_this.state.config.uri, "/null"), {
            data: {
              items: items
            }
          }).then(function (response) {
            console.log('response');
            console.log(response);

            _this.fetch();

            resolve(response);
          })["catch"](function (error) {
            reject(error);
          });
        });
      },
      fetch: function fetch() {
        var _this2 = this;

        this.state.loading = true;
        axios.get(this.state.config.uri, {
          params: this.state.params
        }).then(function (_ref3) {
          var meta = _ref3.meta,
              data = _ref3.data;
          _this2.state.loading = false;
          _this2.state.meta = meta;
          _this2.state.items = data;
        });
      },
      setAppliedFilter: function setAppliedFilter(_ref4) {
        var attribute = _ref4.attribute,
            component = _ref4.component,
            value = _ref4.value;
        var param = this.state.params[attribute].toString();

        if (param != value.toString() || component == 'date-filter') {
          if (this.state.appliedFilters.indexOf(attribute) === -1) this.state.appliedFilters.push(attribute);
        } else {
          var index = this.state.appliedFilters.indexOf(attribute);
          this.state.appliedFilters.splice(index, 1);
        }
      },
      resetFilters: function resetFilters() {
        for (var i = 0; i < this.state.filters.length; i++) {
          var filter = this.state.filters[i];
          this.state.params[filter.attribute] = filter.value;
        }

        this.state.appliedFilters = [];
        this.fetch();
      },
      getActions: function getActions() {
        var _this3 = this;

        axios.get(this.state.config.uri + '/actions').then(function (data) {
          return _this3.state.actions = data;
        });
      },
      getFilters: function getFilters() {
        var _this4 = this;

        axios.get(this.state.config.uri + '/filters').then(function (data) {
          return _this4.state.filters = data;
        });
      },
      paginate: function paginate(direction, page) {
        if (!this.state.meta[direction]) return;
        this.state.params.page = this.state.params.page + page;
        this.fetch();
      }
    }
  });
};

/***/ }),

/***/ "./resources/js/themes/default/filters/SelectFilter.vue":
/*!**************************************************************!*\
  !*** ./resources/js/themes/default/filters/SelectFilter.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SelectFilter_vue_vue_type_template_id_4bfd41ed___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SelectFilter.vue?vue&type=template&id=4bfd41ed& */ "./resources/js/themes/default/filters/SelectFilter.vue?vue&type=template&id=4bfd41ed&");
/* harmony import */ var _SelectFilter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SelectFilter.vue?vue&type=script&lang=js& */ "./resources/js/themes/default/filters/SelectFilter.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SelectFilter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SelectFilter_vue_vue_type_template_id_4bfd41ed___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SelectFilter_vue_vue_type_template_id_4bfd41ed___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/themes/default/filters/SelectFilter.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/themes/default/filters/SelectFilter.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/themes/default/filters/SelectFilter.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectFilter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./SelectFilter.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/themes/default/filters/SelectFilter.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectFilter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/themes/default/filters/SelectFilter.vue?vue&type=template&id=4bfd41ed&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/themes/default/filters/SelectFilter.vue?vue&type=template&id=4bfd41ed& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectFilter_vue_vue_type_template_id_4bfd41ed___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./SelectFilter.vue?vue&type=template&id=4bfd41ed& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/themes/default/filters/SelectFilter.vue?vue&type=template&id=4bfd41ed&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectFilter_vue_vue_type_template_id_4bfd41ed___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SelectFilter_vue_vue_type_template_id_4bfd41ed___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);