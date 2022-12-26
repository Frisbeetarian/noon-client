"use strict";
(() => {
var exports = {};
exports.id = 411;
exports.ids = [411];
exports.modules = {

/***/ 4792:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8930);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_urql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2094);
/* harmony import */ var next_urql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_urql__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_createUrqlClient__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4711);
/* harmony import */ var _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4513);
/* harmony import */ var _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_icons__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils_toErrorMap__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(7299);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2296);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(formik__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _generated_graphql__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9402);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _components_InputField__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(42);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5609);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(yup__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _utils_isServer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7786);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils_createUrqlClient__WEBPACK_IMPORTED_MODULE_4__]);
_utils_createUrqlClient__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





// import { useSelector } from 'react-redux'
// import { getLoggedInUser } from '../store/users'








const RegisterSchema = yup__WEBPACK_IMPORTED_MODULE_10__.object().shape({
    username: yup__WEBPACK_IMPORTED_MODULE_10__.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Username is required'),
    email: yup__WEBPACK_IMPORTED_MODULE_10__.string().email('Invalid email').required('Email is required'),
    password: yup__WEBPACK_IMPORTED_MODULE_10__.string().min(4, 'Password is too short').max(120, 'Password is too long').required('Password is required')
});
const OnboardingPage = ()=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_8__.useRouter)();
    const [, login] = (0,_generated_graphql__WEBPACK_IMPORTED_MODULE_7__/* .useLoginMutation */ .YA)();
    const [, register] = (0,_generated_graphql__WEBPACK_IMPORTED_MODULE_7__/* .useRegisterMutation */ .l4)();
    // const loggedInUser = useSelector(getLoggedInUser)
    const { 0: showPassword1 , 1: setShowPassword  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const { 0: showLogin , 1: setLogin  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const { 0: showRegister , 1: setRegister  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(true);
    const { 0: showForgotPassword , 1: setForgotPassword  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [{ data , fetching  }] = (0,_generated_graphql__WEBPACK_IMPORTED_MODULE_7__/* .useMeQuery */ .UE)({
        pause: (0,_utils_isServer__WEBPACK_IMPORTED_MODULE_11__/* .isServer */ .s)(),
        requestPolicy: 'network-only'
    });
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        var ref;
        if (data === null || data === void 0 ? void 0 : (ref = data.me) === null || ref === void 0 ? void 0 : ref.username) {
            router.replace('/noon');
        } else {
        // router.replace('/noon')
        }
    }, [
        data
    ]);
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Flex, {
        className: "flex-col justify-center items-center bg-black text-white h-screen",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: "fixed top-12 text-5xl",
                children: "NOON"
            }),
            fetching ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                children: "loading..."
            }) : // <Stack spacing={8}></Stack>
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Flex, {
                minH: '100%',
                align: 'center',
                justify: 'center',
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                        spacing: 8,
                        mx: 'auto',
                        maxW: 'lg',
                        py: 12,
                        px: 6,
                        // onClose={onLoginClose}
                        // isOpen={showLogin}
                        hidden: !showLogin,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                                align: 'center',
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Heading, {
                                    fontSize: '4xl',
                                    children: "Login to your account"
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Box, {
                                // rounded={'lg'}
                                // bg={useColorModeValue('white', 'gray.700')}
                                boxShadow: 'lg',
                                p: 8,
                                className: "border bg-black",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_6__.Formik, {
                                    initialValues: {
                                        usernameOrEmail: '',
                                        password: ''
                                    },
                                    onSubmit: async (values, { setErrors  })=>{
                                        var ref, ref1;
                                        const response = await login({
                                            username: values.usernameOrEmail,
                                            password: values.password
                                        });
                                        if ((ref = response.data) === null || ref === void 0 ? void 0 : ref.login.errors) {
                                            setErrors((0,_utils_toErrorMap__WEBPACK_IMPORTED_MODULE_12__/* .toErrorMap */ .s)(response.data.login.errors));
                                        } else if ((ref1 = response.data) === null || ref1 === void 0 ? void 0 : ref1.login.user) {
                                            if (typeof router.query.next === 'string') {
                                                router.push(router.query.next);
                                            } else {
                                                router.replace('/noon');
                                            }
                                        }
                                    },
                                    children: ({ isSubmitting  })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_6__.Form, {
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                                                spacing: 4,
                                                className: "text-white",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.FormControl, {
                                                        id: "email",
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_InputField__WEBPACK_IMPORTED_MODULE_9__/* .InputField */ .U, {
                                                            name: "usernameOrEmail",
                                                            label: "Username or Email"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.FormControl, {
                                                        id: "password",
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_InputField__WEBPACK_IMPORTED_MODULE_9__/* .InputField */ .U, {
                                                            name: "password",
                                                            label: "Password",
                                                            type: "password"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                                                        spacing: 10,
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                                                                direction: {
                                                                    base: 'column',
                                                                    sm: 'row'
                                                                },
                                                                align: 'start',
                                                                justify: 'space-between',
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Checkbox, {
                                                                        children: "Remember me"
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Link, {
                                                                        color: 'blue.400',
                                                                        onClick: ()=>{
                                                                            setLogin(false);
                                                                            setRegister(false);
                                                                            setForgotPassword(true);
                                                                        },
                                                                        children: "Forgot password?"
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Button, {
                                                                size: "lg",
                                                                bg: 'green.400',
                                                                color: 'white',
                                                                _hover: {
                                                                    bg: 'green.900'
                                                                },
                                                                type: "submit",
                                                                isLoading: isSubmitting,
                                                                children: "Login"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        })
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                className: "text-lg text-green-100 cursor-pointer",
                                onClick: ()=>{
                                    setRegister(true);
                                    setLogin(false);
                                },
                                children: "Register?"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                        spacing: 8,
                        mx: 'auto',
                        maxW: 'lg',
                        py: 12,
                        px: 6,
                        // isOpen={showRegister}
                        // onClose={onRegisterClose}
                        hidden: !showRegister,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                                align: 'center',
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Heading, {
                                    fontSize: '4xl',
                                    textAlign: 'center',
                                    children: "Register"
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Box, {
                                // rounded={'lg'}
                                // bg={useColorModeValue('white', 'gray.700')}
                                boxShadow: 'lg',
                                p: 8,
                                className: "border bg-black",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_6__.Formik, {
                                    initialValues: {
                                        email: '',
                                        username: '',
                                        password: ''
                                    },
                                    validationSchema: RegisterSchema,
                                    onSubmit: async (values, { setErrors  })=>{
                                        var ref, ref2, ref3;
                                        console.log(values);
                                        const response = await register({
                                            options: values
                                        });
                                        console.log('register response: ', (ref = response.data) === null || ref === void 0 ? void 0 : ref.register.errors);
                                        if ((ref2 = response.data) === null || ref2 === void 0 ? void 0 : ref2.register.errors) {
                                            console.log('register response: ', response.data);
                                            setErrors((0,_utils_toErrorMap__WEBPACK_IMPORTED_MODULE_12__/* .toErrorMap */ .s)(response.data.register.errors));
                                        } else if ((ref3 = response.data) === null || ref3 === void 0 ? void 0 : ref3.register.user) {
                                            router.replace('/noon');
                                        }
                                    },
                                    children: ({})=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_6__.Form, {
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                                                spacing: 4,
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.HStack, {
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Box, {
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.FormControl, {
                                                                id: "username",
                                                                isRequired: true,
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_InputField__WEBPACK_IMPORTED_MODULE_9__/* .InputField */ .U, {
                                                                    name: "username",
                                                                    placeholder: "username",
                                                                    label: "Username"
                                                                })
                                                            })
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.FormControl, {
                                                        id: "email",
                                                        isRequired: true,
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.FormLabel, {
                                                                children: "Email address"
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_InputField__WEBPACK_IMPORTED_MODULE_9__/* .InputField */ .U, {
                                                                name: "email",
                                                                placeholder: "",
                                                                label: ""
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.FormControl, {
                                                        id: "password",
                                                        isRequired: true,
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.FormLabel, {
                                                                children: "Password"
                                                            }),
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.InputGroup, {
                                                                children: [
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_InputField__WEBPACK_IMPORTED_MODULE_9__/* .InputField */ .U, {
                                                                        name: "password",
                                                                        type: showPassword1 ? 'text' : 'password',
                                                                        placeholder: "",
                                                                        label: ""
                                                                    }),
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.InputRightElement, {
                                                                        h: 'full',
                                                                        className: "mt-1",
                                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Button, {
                                                                            variant: 'ghost',
                                                                            onClick: ()=>setShowPassword((showPassword)=>!showPassword
                                                                                )
                                                                            ,
                                                                            children: showPassword1 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_icons__WEBPACK_IMPORTED_MODULE_5__.ViewIcon, {}) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_icons__WEBPACK_IMPORTED_MODULE_5__.ViewOffIcon, {})
                                                                        })
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                                                        spacing: 10,
                                                        pt: 2,
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Button, {
                                                            type: "submit",
                                                            loadingText: "Submitting",
                                                            size: "lg",
                                                            bg: 'green.400',
                                                            color: 'white',
                                                            _hover: {
                                                                bg: 'green.900'
                                                            },
                                                            children: "Register"
                                                        })
                                                    })
                                                ]
                                            })
                                        })
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                className: "text-lg text-green-100 cursor-pointer",
                                onClick: ()=>{
                                    setLogin(true);
                                    setRegister(false);
                                },
                                children: "Login?"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                        spacing: 4,
                        w: 'full',
                        maxW: 'md',
                        // bg={useColorModeValue('white', 'gray.700')}
                        rounded: 'xl',
                        boxShadow: 'lg',
                        p: 6,
                        my: 12,
                        className: "bg-black",
                        hidden: !showForgotPassword,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Heading, {
                                lineHeight: 1.1,
                                fontSize: {
                                    base: '2xl',
                                    md: '3xl'
                                },
                                children: "Forgot your password?"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                fontSize: {
                                    base: 'sm',
                                    sm: 'md'
                                },
                                children: "You'll get an email with a reset link"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.FormControl, {
                                id: "email",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Input, {
                                    placeholder: "your-email@example.com",
                                    _placeholder: {
                                        color: 'gray.500'
                                    },
                                    type: "email"
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Stack, {
                                spacing: 6,
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Button, {
                                    bg: 'blue.400',
                                    color: 'white',
                                    _hover: {
                                        bg: 'blue.500'
                                    },
                                    children: "Request Reset"
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.Text, {
                                className: "text-lg text-green-100 cursor-pointer",
                                onClick: ()=>{
                                    setLogin(true);
                                    setRegister(false);
                                    setForgotPassword(false);
                                },
                                children: "Back"
                            })
                        ]
                    })
                ]
            })
        ]
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_urql__WEBPACK_IMPORTED_MODULE_2__.withUrqlClient)(_utils_createUrqlClient__WEBPACK_IMPORTED_MODULE_4__/* .createUrqlClient */ .M, {
    ssr: true
})(OnboardingPage));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7299:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "s": () => (/* binding */ toErrorMap)
/* harmony export */ });
const toErrorMap = (errors)=>{
    const errorMap = {};
    errors.forEach(({ field , message  })=>{
        errorMap[field] = message;
    });
    return errorMap;
};


/***/ }),

/***/ 4513:
/***/ ((module) => {

module.exports = require("@chakra-ui/icons");

/***/ }),

/***/ 8930:
/***/ ((module) => {

module.exports = require("@chakra-ui/react");

/***/ }),

/***/ 2296:
/***/ ((module) => {

module.exports = require("formik");

/***/ }),

/***/ 825:
/***/ ((module) => {

module.exports = require("graphql-tag");

/***/ }),

/***/ 2094:
/***/ ((module) => {

module.exports = require("next-urql");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 2977:
/***/ ((module) => {

module.exports = require("urql");

/***/ }),

/***/ 5609:
/***/ ((module) => {

module.exports = require("yup");

/***/ }),

/***/ 9352:
/***/ ((module) => {

module.exports = import("@urql/exchange-graphcache");;

/***/ }),

/***/ 3342:
/***/ ((module) => {

module.exports = import("wonka");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [711,42], () => (__webpack_exec__(4792)));
module.exports = __webpack_exports__;

})();