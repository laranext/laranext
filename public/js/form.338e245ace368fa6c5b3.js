(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["form"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/themes/default/VForm.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/themes/default/VForm.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var Store_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Store/form */ "./resources/js/stores/form.js");
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
    id: String,
    name: String,
    route: String,
    title: String,
    tabs: Boolean,
    samepage: Boolean,
    saveOnly: Boolean
  },
  setup: function setup(props) {
    var _useFormStore = Object(Store_form__WEBPACK_IMPORTED_MODULE_0__["useFormStore"])(props.name)(),
        form = _useFormStore.state,
        init = _useFormStore.init;

    init(props);
    return {
      form: form
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/themes/default/form/FormFields.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/themes/default/form/FormFields.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var Store_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Store/form */ "./resources/js/stores/form.js");
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
    section: String
  },
  setup: function setup(_ref) {
    var name = _ref.name,
        section = _ref.section;

    var _useFormStore = Object(Store_form__WEBPACK_IMPORTED_MODULE_0__["useFormStore"])(name)(),
        form = _useFormStore.state;

    return {
      form: form
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/themes/default/form/FormSubmit.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/themes/default/form/FormSubmit.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var Store_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Store/form */ "./resources/js/stores/form.js");
/* harmony import */ var Store_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Store/index */ "./resources/js/stores/index.js");
/* harmony import */ var Store_flash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Store/flash */ "./resources/js/stores/flash.js");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.module.js");
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
    another: Boolean,
    samepage: Boolean,
    saveOnly: Boolean
  },
  setup: function setup(_ref) {
    var name = _ref.name,
        another = _ref.another,
        samepage = _ref.samepage,
        saveOnly = _ref.saveOnly;

    var _useFormStore = Object(Store_form__WEBPACK_IMPORTED_MODULE_0__["useFormStore"])(name)(),
        form = _useFormStore.state,
        submit = _useFormStore.submit,
        reset = _useFormStore.reset,
        _useIndexStore = Object(Store_index__WEBPACK_IMPORTED_MODULE_1__["useIndexStore"])(name)(),
        fetch = _useIndexStore.fetch,
        _useFlashStore = Object(Store_flash__WEBPACK_IMPORTED_MODULE_2__["useFlashStore"])(),
        flash = _useFlashStore.flash,
        loading = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])(false);

    function onSubmit() {
      if (form.processing) return;
      loading.value = true;
      submit().then(function (response) {
        // Update samepage      samepage id
        // -> Redirect
        // Create               -
        // -> Redirect
        // Update               id
        // -> Redirect
        // Create & Add another         another
        // -> Reset
        // -> Loading False
        // Create samepage              samepage
        // -> Reset
        // -> Fetch
        // -> Loading False
        // Update & Continue Editing    another id
        // -> Loading False
        flash(response.message);

        if (another || samepage && !form.id) {
          loading.value = false;
          form.processing = false;

          if (samepage) {
            fetch();
          }

          if (!form.id && !saveOnly) {
            reset();
          }

          return;
        }

        location.href = response.redirect || "".concat(form.baseUri);
      })["catch"](function (error) {
        loading.value = false;
      });
    }

    return {
      form: form,
      onSubmit: onSubmit,
      loading: loading
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/themes/default/form/FormTabFields.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/themes/default/form/FormTabFields.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var Store_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Store/form */ "./resources/js/stores/form.js");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.module.js");
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
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    name: String
  },
  setup: function setup(_ref) {
    var name = _ref.name;

    var _useFormStore = Object(Store_form__WEBPACK_IMPORTED_MODULE_0__["useFormStore"])(name)(),
        form = _useFormStore.state,
        currentTab = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_1__["ref"])(''),
        tabs = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_1__["ref"])([]);

    function getTabs() {
      for (var key in form.fields) {
        var tab = form.fields[key];
        if (tab.condition && form.fields[tab.condition.field] == tab.condition.value) tabs.value.push(key);else if (!tab.condition) tabs.value.push(key);
      }

      currentTab.value = tabs.value[0];
    }

    function switchTab(tab) {
      currentTab.value = tab;
    }

    getTabs();
    return {
      tabs: tabs,
      currentTab: currentTab,
      switchTab: switchTab
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/themes/default/VForm.vue?vue&type=template&id=ebbf1d36&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/themes/default/VForm.vue?vue&type=template&id=ebbf1d36& ***!
  \************************************************************************************************************************************************************************************************************/
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
      "div",
      { staticClass: "bg-white shadow-md rounded-lg" },
      [
        _c(
          "CardDataLoading",
          { attrs: { loading: _vm.form.loading } },
          [
            _vm.tabs && !Array.isArray(_vm.form.fields)
              ? _c("FormTabFields", { attrs: { name: _vm.name } })
              : _c("FormFields", { attrs: { name: _vm.name } })
          ],
          1
        )
      ],
      1
    ),
    _vm._v(" "),
    !_vm.form.loading
      ? _c("div", { staticClass: "flex py-8" }, [
          _vm.saveOnly
            ? _c(
                "div",
                { staticClass: "flex ml-auto" },
                [
                  _c(
                    "FormSubmit",
                    { attrs: { name: _vm.name, another: "", "save-only": "" } },
                    [_vm._v("\n                Save\n            ")]
                  )
                ],
                1
              )
            : _c(
                "div",
                { staticClass: "flex ml-auto" },
                [
                  !_vm.samepage
                    ? _c(
                        "FormSubmit",
                        { attrs: { name: _vm.name, another: "" } },
                        [
                          _vm._v(
                            "\n                " +
                              _vm._s(
                                _vm.id
                                  ? "Update & Continue Editing"
                                  : "Create & Add Another"
                              ) +
                              "\n            "
                          )
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "FormSubmit",
                    {
                      staticClass: "ml-4",
                      attrs: { name: _vm.name, samepage: _vm.samepage }
                    },
                    [
                      _vm._v(
                        "\n                " +
                          _vm._s(
                            _vm.id
                              ? _vm.$tc("words.update")
                              : _vm.$tc("words.create")
                          ) +
                          " " +
                          _vm._s(_vm.title) +
                          "\n            "
                      )
                    ]
                  )
                ],
                1
              )
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/themes/default/form/FormFields.vue?vue&type=template&id=01b9fb53&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/themes/default/form/FormFields.vue?vue&type=template&id=01b9fb53& ***!
  \**********************************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    _vm._l(
      Array.isArray(_vm.form.fields)
        ? _vm.form.fields
        : _vm.form.fields[_vm.section],
      function(field) {
        return _c(field.component, {
          key: field.attribute,
          tag: "component",
          attrs: { field: field, name: _vm.name }
        })
      }
    ),
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/themes/default/form/FormSubmit.vue?vue&type=template&id=6282f532&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/themes/default/form/FormSubmit.vue?vue&type=template&id=6282f532& ***!
  \**********************************************************************************************************************************************************************************************************************/
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
  return _c(
    "button",
    {
      staticClass: "btn btn-primary",
      attrs: { disabled: _vm.form.processing },
      on: { click: _vm.onSubmit }
    },
    [
      _vm.loading
        ? _c("LoadingSvg", { attrs: { color: "text-white", width: "40px" } })
        : _vm._t("default")
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/themes/default/form/FormTabFields.vue?vue&type=template&id=c468c6f8&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/themes/default/form/FormTabFields.vue?vue&type=template&id=c468c6f8& ***!
  \*************************************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    [
      _c(
        "div",
        { staticClass: "flex" },
        [
          _vm._l(_vm.tabs, function(tab) {
            return _c(
              "div",
              {
                staticClass:
                  "py-5 px-8 border-b-2 focus:outline-none cursor-pointer text-gray-600 font-bold",
                class: { "border-primary": _vm.currentTab == tab },
                on: {
                  click: function($event) {
                    return _vm.switchTab(tab)
                  }
                }
              },
              [_vm._v("\n            " + _vm._s(tab) + "\n        ")]
            )
          }),
          _vm._v(" "),
          _c("div", { staticClass: "flex-1 border-b-2" }, [_vm._v(" ")])
        ],
        2
      ),
      _vm._v(" "),
      _c("FormFields", { attrs: { name: _vm.name, section: _vm.currentTab } })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/stores/form.js":
/*!*************************************!*\
  !*** ./resources/js/stores/form.js ***!
  \*************************************/
/*! exports provided: useFormStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useFormStore", function() { return useFormStore; });
/* harmony import */ var pinia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pinia */ "./node_modules/pinia/dist/pinia.esm.js");
/* harmony import */ var Store_flash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Store/flash */ "./resources/js/stores/flash.js");


var useFormStore = function useFormStore(name) {
  var data = {};
  return Object(pinia__WEBPACK_IMPORTED_MODULE_0__["createStore"])({
    id: 'form-' + name,
    state: function state() {
      return {
        id: null,
        uri: '',
        baseUri: '',
        data: {},
        errors: {},
        fields: [],
        getUri: '',
        submitUri: '',
        loading: true,
        processing: false
      };
    },
    actions: {
      init: function init(_ref) {
        var id = _ref.id,
            route = _ref.route;
        var uri = '';

        if (App.key && route) {
          uri = "".concat(App.key, "/").concat(route);
        } else if (App.key) {
          uri = App.key;
        } else if (route) {
          uri = route;
        }

        if (id) {
          this.patch({
            id: id,
            uri: uri,
            baseUri: this.baseUri(route),
            getUri: "".concat(uri, "/").concat(id, "/edit"),
            submitUri: "".concat(uri, "/").concat(id)
          });
        } else {
          this.patch({
            uri: uri,
            baseUri: this.baseUri(route),
            getUri: "".concat(uri, "/create").concat(window.location.search),
            submitUri: uri
          });
        }

        this.getFields();
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
      setFieldsData: function setFieldsData(fields) {
        if (Array.isArray(fields)) {
          for (var i = 0; i < fields.length; i++) {
            var _fields$i = fields[i],
                attribute = _fields$i.attribute,
                value = _fields$i.value,
                sub = _fields$i.sub;

            if (sub && sub.length) {
              this.setFieldsData(sub);
              return;
            }

            data[attribute] = value;
          }

          return;
        }

        for (var key in fields) {
          this.setFieldsData(fields[key]);
        }
      },
      getFields: function getFields() {
        var _this = this;

        axios.get(this.state.getUri).then(function (fields) {
          _this.state.fields = fields;
          _this.state.loading = false;

          _this.setFieldsData(fields);

          _this.state.data = data;
        });
      },
      setFields: function setFields(fields) {
        this.state.fields = fields;
        this.setFieldsData(fields);
        this.state.data = data;
      },
      reset: function reset() {
        this.state.data = {};
        this.state.errors = {};
      },
      submit: function submit() {
        var _this2 = this;

        var method = this.state.id ? 'patch' : 'post',
            _useFlashStore = Object(Store_flash__WEBPACK_IMPORTED_MODULE_1__["useFlashStore"])(),
            flash = _useFlashStore.flash;

        this.state.processing = true;
        return new Promise(function (resolve, reject) {
          axios[method](_this2.state.submitUri, _this2.state.data).then(function (response) {
            return resolve(response);
          })["catch"](function (error) {
            if (error.response.status == 422) {
              _this2.state.errors = error.response.data.errors;
            }

            _this2.state.processing = false;
            flash(error.response.data.message, 'danger');
            reject(error);
          });
        });
      }
    }
  });
};

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

/***/ "./resources/js/themes/default/VForm.vue":
/*!***********************************************!*\
  !*** ./resources/js/themes/default/VForm.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VForm_vue_vue_type_template_id_ebbf1d36___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VForm.vue?vue&type=template&id=ebbf1d36& */ "./resources/js/themes/default/VForm.vue?vue&type=template&id=ebbf1d36&");
/* harmony import */ var _VForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VForm.vue?vue&type=script&lang=js& */ "./resources/js/themes/default/VForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _VForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _VForm_vue_vue_type_template_id_ebbf1d36___WEBPACK_IMPORTED_MODULE_0__["render"],
  _VForm_vue_vue_type_template_id_ebbf1d36___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/themes/default/VForm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/themes/default/VForm.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/themes/default/VForm.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./VForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/themes/default/VForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/themes/default/VForm.vue?vue&type=template&id=ebbf1d36&":
/*!******************************************************************************!*\
  !*** ./resources/js/themes/default/VForm.vue?vue&type=template&id=ebbf1d36& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VForm_vue_vue_type_template_id_ebbf1d36___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./VForm.vue?vue&type=template&id=ebbf1d36& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/themes/default/VForm.vue?vue&type=template&id=ebbf1d36&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VForm_vue_vue_type_template_id_ebbf1d36___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VForm_vue_vue_type_template_id_ebbf1d36___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/themes/default/form/FormFields.vue":
/*!*********************************************************!*\
  !*** ./resources/js/themes/default/form/FormFields.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FormFields_vue_vue_type_template_id_01b9fb53___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormFields.vue?vue&type=template&id=01b9fb53& */ "./resources/js/themes/default/form/FormFields.vue?vue&type=template&id=01b9fb53&");
/* harmony import */ var _FormFields_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormFields.vue?vue&type=script&lang=js& */ "./resources/js/themes/default/form/FormFields.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FormFields_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FormFields_vue_vue_type_template_id_01b9fb53___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FormFields_vue_vue_type_template_id_01b9fb53___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/themes/default/form/FormFields.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/themes/default/form/FormFields.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/themes/default/form/FormFields.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormFields_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FormFields.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/themes/default/form/FormFields.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormFields_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/themes/default/form/FormFields.vue?vue&type=template&id=01b9fb53&":
/*!****************************************************************************************!*\
  !*** ./resources/js/themes/default/form/FormFields.vue?vue&type=template&id=01b9fb53& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormFields_vue_vue_type_template_id_01b9fb53___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FormFields.vue?vue&type=template&id=01b9fb53& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/themes/default/form/FormFields.vue?vue&type=template&id=01b9fb53&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormFields_vue_vue_type_template_id_01b9fb53___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormFields_vue_vue_type_template_id_01b9fb53___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/themes/default/form/FormSubmit.vue":
/*!*********************************************************!*\
  !*** ./resources/js/themes/default/form/FormSubmit.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FormSubmit_vue_vue_type_template_id_6282f532___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormSubmit.vue?vue&type=template&id=6282f532& */ "./resources/js/themes/default/form/FormSubmit.vue?vue&type=template&id=6282f532&");
/* harmony import */ var _FormSubmit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormSubmit.vue?vue&type=script&lang=js& */ "./resources/js/themes/default/form/FormSubmit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FormSubmit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FormSubmit_vue_vue_type_template_id_6282f532___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FormSubmit_vue_vue_type_template_id_6282f532___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/themes/default/form/FormSubmit.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/themes/default/form/FormSubmit.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/themes/default/form/FormSubmit.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormSubmit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FormSubmit.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/themes/default/form/FormSubmit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormSubmit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/themes/default/form/FormSubmit.vue?vue&type=template&id=6282f532&":
/*!****************************************************************************************!*\
  !*** ./resources/js/themes/default/form/FormSubmit.vue?vue&type=template&id=6282f532& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormSubmit_vue_vue_type_template_id_6282f532___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FormSubmit.vue?vue&type=template&id=6282f532& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/themes/default/form/FormSubmit.vue?vue&type=template&id=6282f532&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormSubmit_vue_vue_type_template_id_6282f532___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormSubmit_vue_vue_type_template_id_6282f532___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/themes/default/form/FormTabFields.vue":
/*!************************************************************!*\
  !*** ./resources/js/themes/default/form/FormTabFields.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FormTabFields_vue_vue_type_template_id_c468c6f8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormTabFields.vue?vue&type=template&id=c468c6f8& */ "./resources/js/themes/default/form/FormTabFields.vue?vue&type=template&id=c468c6f8&");
/* harmony import */ var _FormTabFields_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormTabFields.vue?vue&type=script&lang=js& */ "./resources/js/themes/default/form/FormTabFields.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FormTabFields_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FormTabFields_vue_vue_type_template_id_c468c6f8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FormTabFields_vue_vue_type_template_id_c468c6f8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/themes/default/form/FormTabFields.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/themes/default/form/FormTabFields.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/themes/default/form/FormTabFields.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormTabFields_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FormTabFields.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/themes/default/form/FormTabFields.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormTabFields_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/themes/default/form/FormTabFields.vue?vue&type=template&id=c468c6f8&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/themes/default/form/FormTabFields.vue?vue&type=template&id=c468c6f8& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormTabFields_vue_vue_type_template_id_c468c6f8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FormTabFields.vue?vue&type=template&id=c468c6f8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/themes/default/form/FormTabFields.vue?vue&type=template&id=c468c6f8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormTabFields_vue_vue_type_template_id_c468c6f8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormTabFields_vue_vue_type_template_id_c468c6f8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);