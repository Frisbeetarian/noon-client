"use strict";
(() => {
var exports = {};
exports.id = 248;
exports.ids = [248];
exports.modules = {

/***/ 4435:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8930);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4513);
/* harmony import */ var _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store_chat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7917);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _store_users__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5565);
/* harmony import */ var _store_sockets__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6135);
/* harmony import */ var _generated_graphql__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9402);
/* harmony import */ var _store_ui__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9224);










function GroupConversationListing({ conversation: conversation1 , i  }) {
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useDispatch)();
    const [, leaveGroup] = (0,_generated_graphql__WEBPACK_IMPORTED_MODULE_8__/* .useLeaveGroupMutation */ .nm)();
    const loggedInUser = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useSelector)(_store_users__WEBPACK_IMPORTED_MODULE_6__/* .getLoggedInUser */ .r);
    const socket = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useSelector)(_store_sockets__WEBPACK_IMPORTED_MODULE_7__/* .getSocket */ .hb);
    const activeConversation = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useSelector)(_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .getActiveConversation */ .tI);
    function setActiveGroup(conversation) {
        var ref, ref1;
        dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .setActiveConversationSet */ .bC)(false));
        dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .setActiveConversee */ .HJ)(null));
        dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .setActiveConversation */ .K4)(null));
        dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .setShouldPauseCheckHasMore */ .J0)(false));
        dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .setActiveGroupInStore */ .q7)(null));
        dispatch((0,_store_ui__WEBPACK_IMPORTED_MODULE_9__/* .setSearchComponent */ .JD)({
            searchActive: false,
            containerDisplay: 'relative',
            containerHeight: '5vh',
            inputPadding: '5px'
        }));
        dispatch((0,_store_ui__WEBPACK_IMPORTED_MODULE_9__/* .setChatContainerHeight */ .Ov)('87.5vh'));
        dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .setActiveGroupInStore */ .q7)({
            conversation,
            loggedInProfileUuid: loggedInUser === null || loggedInUser === void 0 ? void 0 : (ref = loggedInUser.user) === null || ref === void 0 ? void 0 : (ref1 = ref.profile) === null || ref1 === void 0 ? void 0 : ref1.uuid
        }));
    }
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
        tabindex: "0",
        className: "items-center justify-between p-3 pl-5 border-b border-b-base-300 border-b-amber-100 hover:border-sky-500 focus:outline-none focus:border-sky-700 focus-within:shadow-lg",
        style: {
            transition: 'all .25s '
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
                className: "items-center cursor-pointer flex-1",
                onClick: ()=>{
                    setActiveGroup(conversation1);
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Avatar, {
                        name: conversation1.name,
                        size: "sm",
                        className: "mr-2",
                        children: conversation1.unreadMessages && conversation1.unreadMessages !== 0 && conversation1.profileThatHasUnreadMessages === loggedInUser.user.profile.uuid ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.AvatarBadge, {
                            boxSize: "1.25em",
                            bg: "red.500",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "text-xs",
                                children: conversation1.unreadMessages
                            })
                        }) : null
                    }, i),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        children: conversation1.name
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Menu, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.MenuButton, {
                        as: _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.IconButton,
                        "aria-label": "Options",
                        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.HamburgerIcon, {}),
                        variant: "outline"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.MenuList, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.MenuItem, {
                            icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.EditIcon, {}),
                            onClick: async ()=>{
                                const leaveGroupResponse = await leaveGroup({
                                    groupUuid: conversation1.uuid
                                });
                                console.log('leave group response:', leaveGroupResponse);
                                dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .removeConversation */ .Ae)({
                                    conversationUuid: conversation1.uuid
                                }));
                                if (activeConversation && activeConversation.uuid === conversation1.uuid) {
                                    dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .setActiveConversationSet */ .bC)(false));
                                    dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .setActiveConversee */ .HJ)(null));
                                    dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .setActiveConversation */ .K4)(null));
                                    dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .setShouldPauseCheckHasMore */ .J0)(false));
                                }
                                if (leaveGroupResponse) {
                                    var ref6, ref2, ref3, ref4;
                                    const participantsToSend = [];
                                    conversation1.profiles.map((profile)=>{
                                        var ref, ref5;
                                        if (profile.uuid !== ((ref = loggedInUser.user) === null || ref === void 0 ? void 0 : (ref5 = ref.profile) === null || ref5 === void 0 ? void 0 : ref5.uuid)) {
                                            participantsToSend.push(profile.uuid);
                                        }
                                    });
                                    socket.emit('left-group', {
                                        fromUuid: (ref6 = loggedInUser.user) === null || ref6 === void 0 ? void 0 : (ref2 = ref6.profile) === null || ref2 === void 0 ? void 0 : ref2.uuid,
                                        fromUsername: (ref3 = loggedInUser.user) === null || ref3 === void 0 ? void 0 : (ref4 = ref3.profile) === null || ref4 === void 0 ? void 0 : ref4.username,
                                        conversationUuid: conversation1.uuid,
                                        participants: participantsToSend
                                    });
                                }
                            },
                            children: "Leave group"
                        })
                    })
                ]
            })
        ]
    }, conversation1.uuid));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GroupConversationListing);


/***/ }),

/***/ 9499:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8930);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4513);
/* harmony import */ var _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store_users__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5565);
/* harmony import */ var _store_chat__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7917);
/* harmony import */ var _store_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9224);
/* harmony import */ var _store_video__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4912);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _store_sockets__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6135);
/* harmony import */ var _generated_graphql__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9402);









// import { useRouter } from 'next/router'


function PrivateConversationListing({ conversation: conversation1 , i  }) {
    const { 1: setProfile  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    // const router = useRouter()
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_8__.useDispatch)();
    const loggedInUser = (0,react_redux__WEBPACK_IMPORTED_MODULE_8__.useSelector)(_store_users__WEBPACK_IMPORTED_MODULE_4__/* .getLoggedInUser */ .r);
    const socket = (0,react_redux__WEBPACK_IMPORTED_MODULE_8__.useSelector)(_store_sockets__WEBPACK_IMPORTED_MODULE_9__/* .getSocket */ .hb);
    const activeConversation = (0,react_redux__WEBPACK_IMPORTED_MODULE_8__.useSelector)(_store_chat__WEBPACK_IMPORTED_MODULE_5__/* .getActiveConversation */ .tI);
    const [, unfriend] = (0,_generated_graphql__WEBPACK_IMPORTED_MODULE_10__/* .useUnfriendMutation */ .kJ)();
    function setActiveConverseeFunction(profile, conversation) {
        dispatch((0,_store_ui__WEBPACK_IMPORTED_MODULE_6__/* .setSearchComponent */ .JD)({
            searchActive: false,
            containerDisplay: 'relative',
            containerHeight: '5vh',
            inputPadding: '5px'
        }));
        if (activeConversation) {
            if (conversation.uuid !== activeConversation.uuid) {
                var ref, ref1;
                dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_5__/* .setActiveConversationSet */ .bC)(false));
                dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_5__/* .setActiveConversee */ .HJ)(null));
                dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_5__/* .setActiveConversation */ .K4)(null));
                dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_5__/* .setShouldPauseCheckHasMore */ .J0)(false));
                dispatch((0,_store_video__WEBPACK_IMPORTED_MODULE_7__/* .setVideoFrameForConversation */ .Iw)(false));
                // setTimeout(() => {
                dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_5__/* .setActiveConversationSet */ .bC)(true));
                dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_5__/* .setActiveConversee */ .HJ)(profile));
                dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_5__/* .setActiveConversation */ .K4)({
                    conversation: conversation,
                    loggedInProfileUuid: loggedInUser === null || loggedInUser === void 0 ? void 0 : (ref = loggedInUser.user) === null || ref === void 0 ? void 0 : (ref1 = ref.profile) === null || ref1 === void 0 ? void 0 : ref1.uuid
                }));
            }
        } else {
            var ref2, ref3;
            dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_5__/* .setActiveConversationSet */ .bC)(false));
            dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_5__/* .setActiveConversee */ .HJ)(null));
            dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_5__/* .setActiveConversation */ .K4)(null));
            dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_5__/* .setShouldPauseCheckHasMore */ .J0)(false));
            // setTimeout(() => {
            dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_5__/* .setActiveConversationSet */ .bC)(true));
            dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_5__/* .setActiveConversee */ .HJ)(profile));
            dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_5__/* .setActiveConversation */ .K4)({
                conversation: conversation,
                loggedInProfileUuid: loggedInUser === null || loggedInUser === void 0 ? void 0 : (ref2 = loggedInUser.user) === null || ref2 === void 0 ? void 0 : (ref3 = ref2.profile) === null || ref3 === void 0 ? void 0 : ref3.uuid
            }));
        }
        dispatch((0,_store_ui__WEBPACK_IMPORTED_MODULE_6__/* .setChatContainerHeight */ .Ov)('87.5vh'));
    }
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
        tabindex: "0",
        className: "items-center justify-between p-3 pl-5 border-b border-b-base-300 border-b-amber-100 hover:border-sky-500 focus:outline-none focus:border-sky-700 focus-within:shadow-lg",
        style: {
            transition: 'all .25s '
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
                className: "items-center cursor-pointer flex-1",
                onClick: ()=>{
                    setActiveConverseeFunction(conversation1.conversee, conversation1);
                    setProfile(conversation1.conversee);
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Avatar, {
                        name: conversation1.conversee.username,
                        size: "sm",
                        className: "mr-2",
                        children: conversation1.unreadMessages && conversation1.unreadMessages !== 0 && conversation1.profileThatHasUnreadMessages === loggedInUser.user.profile.uuid ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.AvatarBadge, {
                            boxSize: "1.25em",
                            bg: "red.500",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "text-xs",
                                children: conversation1.unreadMessages
                            })
                        }) : null
                    }, i),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        children: conversation1.conversee.username
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Menu, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.MenuButton, {
                        as: _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.IconButton,
                        "aria-label": "Options",
                        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.HamburgerIcon, {}),
                        variant: "outline"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.MenuList, {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.MenuItem, {
                                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.EditIcon, {}),
                                onClick: async ()=>{
                                    var ref;
                                    const unfriendResponse = await unfriend({
                                        profileUuid: conversation1.conversee.uuid,
                                        conversationUuid: conversation1.uuid
                                    });
                                    dispatch((0,_store_users__WEBPACK_IMPORTED_MODULE_4__/* .removeFriendEntry */ .ei)({
                                        profileUuid: conversation1.conversee.uuid,
                                        friends: (ref = loggedInUser.user) === null || ref === void 0 ? void 0 : ref.friends
                                    }));
                                    dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_5__/* .removeConversation */ .Ae)({
                                        conversationUuid: conversation1.uuid
                                    }));
                                    dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_5__/* .setActiveConversationSet */ .bC)(false));
                                    dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_5__/* .setActiveConversee */ .HJ)(null));
                                    dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_5__/* .setActiveConversation */ .K4)(null));
                                    dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_5__/* .setShouldPauseCheckHasMore */ .J0)(false));
                                    if (unfriendResponse) {
                                        var ref4, ref5, ref6, ref7, ref8, ref9;
                                        socket.emit('unfriend', {
                                            content: ((ref4 = loggedInUser.user) === null || ref4 === void 0 ? void 0 : (ref5 = ref4.profile) === null || ref5 === void 0 ? void 0 : ref5.username) + ' unfriended you.',
                                            from: (ref6 = loggedInUser.user) === null || ref6 === void 0 ? void 0 : (ref7 = ref6.profile) === null || ref7 === void 0 ? void 0 : ref7.uuid,
                                            fromUsername: (ref8 = loggedInUser.user) === null || ref8 === void 0 ? void 0 : (ref9 = ref8.profile) === null || ref9 === void 0 ? void 0 : ref9.username,
                                            to: conversation1.conversee.uuid,
                                            toUsername: conversation1.conversee.username,
                                            conversationUuid: conversation1.uuid
                                        });
                                    }
                                },
                                children: "Unfriend"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.MenuItem, {
                                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_icons__WEBPACK_IMPORTED_MODULE_3__.EditIcon, {}),
                                children: "Block"
                            })
                        ]
                    })
                ]
            })
        ]
    }, conversation1.uuid));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PrivateConversationListing);


/***/ }),

/***/ 6170:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ SocketConnector)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4612);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store_users__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5565);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8930);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _store_sockets__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6135);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([socket_io_client__WEBPACK_IMPORTED_MODULE_2__]);
socket_io_client__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];







const ENDPOINT = 'http://localhost:4020';
const socket = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_2__["default"])(ENDPOINT, {
    autoConnect: false
});
function SocketConnector() {
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useDispatch)();
    const loggedInUser = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)(_store_users__WEBPACK_IMPORTED_MODULE_4__/* .getLoggedInUser */ .r);
    const { 0: isConnected , 1: setIsConnected  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(socket.connected);
    const { 0: socketError , 1: setSocketError  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const sessionID1 = localStorage.getItem('sessionID');
        console.log('session id:', sessionID1);
        try {
            var ref, ref1;
            // if (!socket.connected) {
            // TODO check why adding condition for logged in user generates new session id item in storage
            // if (sessionID && loggedInUser.user.profile) {
            if (sessionID1 && ((ref = loggedInUser.user) === null || ref === void 0 ? void 0 : (ref1 = ref.profile) === null || ref1 === void 0 ? void 0 : ref1.uuid)) {
                var ref2, ref3, ref4, ref5, ref6, ref7;
                console.log('sessionID:', sessionID1);
                // this.usernameAlreadySelected = true
                socket.auth = {
                    sessionID: sessionID1,
                    username: loggedInUser === null || loggedInUser === void 0 ? void 0 : (ref2 = loggedInUser.user) === null || ref2 === void 0 ? void 0 : (ref3 = ref2.profile) === null || ref3 === void 0 ? void 0 : ref3.username,
                    userSocketUuid: (ref4 = loggedInUser.user) === null || ref4 === void 0 ? void 0 : (ref5 = ref4.profile) === null || ref5 === void 0 ? void 0 : ref5.uuid,
                    userID: (ref6 = loggedInUser.user) === null || ref6 === void 0 ? void 0 : (ref7 = ref6.profile) === null || ref7 === void 0 ? void 0 : ref7.uuid
                };
                socket.connect();
                dispatch((0,_store_sockets__WEBPACK_IMPORTED_MODULE_6__/* .setSocket */ .uU)({
                    socket
                }));
            } else {
                var ref8, ref9, ref10, ref11, ref12, ref13;
                socket.auth = {
                    username: loggedInUser === null || loggedInUser === void 0 ? void 0 : (ref8 = loggedInUser.user) === null || ref8 === void 0 ? void 0 : (ref9 = ref8.profile) === null || ref9 === void 0 ? void 0 : ref9.username,
                    userSocketUuid: (ref10 = loggedInUser.user) === null || ref10 === void 0 ? void 0 : (ref11 = ref10.profile) === null || ref11 === void 0 ? void 0 : ref11.uuid,
                    userID: (ref12 = loggedInUser.user) === null || ref12 === void 0 ? void 0 : (ref13 = ref12.profile) === null || ref13 === void 0 ? void 0 : ref13.uuid
                };
                socket.connect();
                dispatch((0,_store_sockets__WEBPACK_IMPORTED_MODULE_6__/* .setSocket */ .uU)({
                    socket
                }));
            }
        } catch (e) {
            setSocketError(true);
            console.log('socket error:', socketError);
        }
        // if (socket) {
        socket.on('session', ({ sessionID , userID  })=>{
            console.log('session received:', sessionID);
            socket.auth = {
                sessionID
            };
            localStorage.setItem('sessionID', sessionID);
            socket.userID = userID;
        });
        socket.on('disconnect', ()=>{
            setIsConnected(false);
        });
        socket.on('connect_error', (err)=>{
            if (err.message === 'invalid username') {
                setIsConnected(false);
            }
        });
        socket.on('connect', ()=>{
            setIsConnected(true);
        });
        socket.onAny((event, ...args)=>{
            console.log(event, args);
        });
        // }
        return ()=>{
            // if (socket)
            socket.off('connect');
            socket.off('disconnect');
            socket.off('session');
            socket.off('connect_error');
        };
    }, [
        loggedInUser
    ]);
    // useEffect(() => {
    //   if (socket) {
    // socket.on(
    //   'friendship-request-accepted',
    //   ({ content, from, fromUsername, to, conversation }) => {
    //     dispatch(
    //       addConversation({
    //         conversation,
    //         loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
    //       })
    //     )
    //
    //     toast({
    //       id: from,
    //       title: `${fromUsername} sent you a friend request.`,
    //       position: 'bottom-right',
    //       isClosable: true,
    //       status: 'success',
    //       duration: 5000,
    //       render: () => (
    //         <Flex direction="column" color="white" p={3} bg="green.500">
    //           <Flex>
    //             <p>{fromUsername} accepted your friend request.</p>
    //             <CloseButton
    //               className="sticky top ml-4"
    //               size="sm"
    //               onClick={() => {
    //                 toast.close(from)
    //               }}
    //             />
    //           </Flex>
    //         </Flex>
    //       ),
    //     })
    //   }
    // )
    // socket.on('private message', ({ content, from, fromUsername, to }) => {
    //   console.log('received private message content:', content)
    //   console.log('received private message from:', from)
    //
    //   console.log('received private message from:', fromUsername)
    //   console.log('received private message content:', to)
    //
    //   setFromFriendshipRequest(fromUsername)
    //   setprivateMessage(true)
    //
    //   toast({
    //     id: from,
    //     title: `${fromUsername} sent you a friend request.`,
    //     position: 'bottom-right',
    //     isClosable: true,
    //     status: 'success',
    //     duration: null,
    //     render: () => (
    //       <Flex direction="column" color="white" p={3} bg="green.500">
    //         <Flex>
    //           <p>{fromUsername} sent you a friend request.</p>
    //           <CloseButton
    //             className="sticky top ml-4"
    //             size="sm"
    //             onClick={() => {
    //               toast.close(from)
    //             }}
    //           />
    //         </Flex>
    //
    //         <Flex className="justify-end mt-3">
    //           <Button
    //             className="mr-3"
    //             onClick={async () => {
    //               const acceptFriendshipResponse = await acceptFriendRequest({
    //                 profileUuid: from,
    //               })
    //
    //               dispatch(
    //                 setFriendFlagOnProfile({
    //                   profileUuid: from,
    //                 })
    //               )
    //
    //               dispatch(
    //                 addFriendEntry({
    //                   friend: {
    //                     uuid: from,
    //                     username: fromUsername,
    //                   },
    //                 })
    //               )
    //
    //               dispatch(
    //                 addConversation({
    //                   conversation:
    //                     acceptFriendshipResponse.data?.acceptFriendRequest,
    //                   loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
    //                 })
    //               )
    //
    //               if (acceptFriendshipResponse) {
    //                 socket.emit('friendship-request-accepted', {
    //                   content:
    //                     loggedInUser.user?.profile?.username +
    //                     ' accepted your friend request.',
    //                   from: loggedInUser.user?.profile?.uuid,
    //                   fromUsername: loggedInUser.user?.profile?.username,
    //                   to: from,
    //                   toUsername: fromUsername,
    //                   conversation:
    //                     acceptFriendshipResponse.data?.acceptFriendRequest,
    //                 })
    //               }
    //
    //               toast.close(from)
    //             }}
    //           >
    //             Accept
    //           </Button>
    //           <Button>Reject</Button>
    //         </Flex>
    //       </Flex>
    //     ),
    //   })
    // })
    // socket.on('friend-connected', ({ username, uuid }) => {
    //   toast({
    //     id: uuid,
    //     title: `${username} went offline.`,
    //     position: 'bottom-right',
    //     isClosable: true,
    //     status: 'warning',
    //     duration: 5000,
    //   })
    // })
    // socket.on('friend-disconnected', ({ username, uuid }) => {
    //   toast({
    //     id: uuid,
    //     title: `${username} went offline.`,
    //     position: 'bottom-right',
    //     isClosable: true,
    //     status: 'warning',
    //     duration: 5000,
    //   })
    // })
    //
    // socket.on(
    //   'set-pending-call-for-conversation',
    //   ({ from, fromUsername, to, toUsername, conversationUuid }) => {
    //     dispatch(
    //       setPendingCall({
    //         uuid: conversationUuid,
    //         initiator: {
    //           uuid: from,
    //           username: fromUsername,
    //         },
    //       })
    //     )
    //   }
    // )
    //
    // socket.on(
    //   'cancel-pending-call-for-conversation',
    //   ({ conversationUuid }) => {
    //     dispatch(
    //       cancelPendingCall({
    //         conversationUuid,
    //       })
    //     )
    //   }
    // )
    //     return () => {
    //       // socket.off('private message')
    //       // socket.off('friendship-request-accepted')
    //       // socket.off('friend-disconnected')
    //       // socket.off('set-ongoing-call-for-conversation')
    //       // socket.off('set-pending-call-for-conversation')
    //       // socket.off('cancel-pending-call-for-conversation')
    //     }
    //   }
    // }, [socket])
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__.Box, {
        className: "flex mt-0.5",
        children: isConnected ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "w-2 h-2 bg-green-500 rounded ml-2 "
        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "w-2 h-2 bg-red-500 rounded ml-2 "
        })
    }));
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9306:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8930);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4412);
/* harmony import */ var _store_chat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7917);
/* harmony import */ var _store_video__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4912);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _store_sockets__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6135);
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8706);
/* harmony import */ var _Messages__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(4876);
/* harmony import */ var _store_users__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5565);
/* harmony import */ var _generated_graphql__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(9402);
/* harmony import */ var _store_ui__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(9224);
/* harmony import */ var _ChatControlsAndSearch__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(3089);
/* harmony import */ var _FileUpload__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(5157);
/* harmony import */ var _CreateGroup__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(6405);
/* harmony import */ var _Video__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(2698);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_FileUpload__WEBPACK_IMPORTED_MODULE_14__]);
_FileUpload__WEBPACK_IMPORTED_MODULE_14__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];














// import { setFriendFlagOnProfile } from '../../store/profiles'



function Chat() {
    var ref6, ref1, ref2, ref3;
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useDispatch)();
    const loggedInUser = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useSelector)(_store_users__WEBPACK_IMPORTED_MODULE_10__/* .getLoggedInUser */ .r);
    const isCreateGroupOpen = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useSelector)(_store_ui__WEBPACK_IMPORTED_MODULE_12__/* .getCreateGroupComponent */ .hw);
    const { 0: inputMessage , 1: setInputMessage  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
    const socket = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useSelector)(_store_sockets__WEBPACK_IMPORTED_MODULE_7__/* .getSocket */ .hb);
    const activeConversation = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useSelector)(_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .getActiveConversation */ .tI);
    const activeConversationSet = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useSelector)(_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .getActiveConversationSet */ .e$);
    const videoFrameOpenState = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useSelector)(_store_video__WEBPACK_IMPORTED_MODULE_5__/* .getVideoFrameOpenState */ .ir);
    const chatContainerHeight = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useSelector)(_store_ui__WEBPACK_IMPORTED_MODULE_12__/* .getChatContainerHeight */ .RG);
    const profile1 = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useSelector)(_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .getActiveConversee */ .PY);
    const [, saveMessage] = (0,_generated_graphql__WEBPACK_IMPORTED_MODULE_11__/* .useSaveMessageMutation */ .J_)();
    const [, saveGroupMessage] = (0,_generated_graphql__WEBPACK_IMPORTED_MODULE_11__/* .useSaveGroupMessageMutation */ .g6)();
    // const [, acceptFriendRequest] = useAcceptFriendRequestMutation()
    const [, updateUnreadMessagesForConversation] = (0,_generated_graphql__WEBPACK_IMPORTED_MODULE_11__/* .useUpdateUnreadMessagesForConversationMutation */ .FG)();
    const toast = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.useToast)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (socket) {
            socket.on('message-deleted-confirmed', ()=>{
                alert('delete message confirmed received');
            });
            socket.on('private-chat-message', ({ from , fromUsername , messageUuid , message , conversationUuid , type , src ,  })=>{
                var ref;
                if (!message.trim().length) {
                    return;
                }
                const data = message;
                if (activeConversationSet === false || conversationUuid !== activeConversation.uuid) {
                    var ref4, ref5;
                    updateUnreadMessagesForConversation({
                        conversationUuid: conversationUuid,
                        profileUuid: loggedInUser === null || loggedInUser === void 0 ? void 0 : (ref4 = loggedInUser.user) === null || ref4 === void 0 ? void 0 : (ref5 = ref4.profile) === null || ref5 === void 0 ? void 0 : ref5.uuid
                    });
                }
                dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .addMessageToActiveConversation */ .Yn)({
                    uuid: messageUuid,
                    message: data,
                    sender: {
                        uuid: from,
                        username: fromUsername
                    },
                    from: 'computer',
                    conversationUuid,
                    loggedInProfile: (ref = loggedInUser.user) === null || ref === void 0 ? void 0 : ref.profile,
                    type,
                    src
                }));
            });
        }
        return ()=>{
            if (socket) {
                socket.off('private-chat-message');
            }
        };
    }, [
        socket,
        activeConversationSet
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (socket) {
            socket.on('friendship-request-accepted', ({ from , fromUsername , conversation  })=>{
                var ref, ref7, ref8;
                dispatch((0,_store_users__WEBPACK_IMPORTED_MODULE_10__/* .removeFriendRequestEntry */ .t9)({
                    profileUuid: from,
                    friendRequests: (ref = loggedInUser.user) === null || ref === void 0 ? void 0 : ref.friendshipRequests
                }));
                dispatch((0,_store_users__WEBPACK_IMPORTED_MODULE_10__/* .addFriendEntry */ .cY)({
                    friend: {
                        uuid: from,
                        username: fromUsername
                    }
                }));
                dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .addConversation */ .V$)({
                    conversation: conversation,
                    loggedInProfileUuid: (ref7 = loggedInUser.user) === null || ref7 === void 0 ? void 0 : (ref8 = ref7.profile) === null || ref8 === void 0 ? void 0 : ref8.uuid
                }));
            // toast({
            //   id: from,
            //   title: `${fromUsername} accepted your friend request.`,
            //   position: 'bottom-right',
            //   isClosable: true,
            //   status: 'success',
            //   duration: 5000,
            //   render: () => (
            //     <Flex direction="column" color="white" p={3} bg="green.500">
            //       <Flex>
            //         <p>{fromUsername} accepted your friend request.</p>
            //
            //         <CloseButton
            //           className="sticky top ml-4"
            //           size="sm"
            //           onClick={() => {
            //             toast.close(from)
            //           }}
            //           name="close button"
            //         />
            //       </Flex>
            //     </Flex>
            //   ),
            // })
            });
            socket.on('cancel-friend-request', ({ from , fromUsername  })=>{
                var ref;
                dispatch((0,_store_users__WEBPACK_IMPORTED_MODULE_10__/* .removeFriendRequestEntry */ .t9)({
                    profileUuid: from,
                    friendRequests: (ref = loggedInUser.user) === null || ref === void 0 ? void 0 : ref.friendshipRequests
                }));
                // toast.closeAll()
                toast.close(from);
                toast({
                    id: from,
                    title: `${fromUsername} has cancelled the friend request.`,
                    position: 'bottom-right',
                    isClosable: true,
                    status: 'error',
                    duration: 5000
                });
            });
            socket.on('send-friend-request', ({ from , fromUsername  })=>{
                dispatch((0,_store_users__WEBPACK_IMPORTED_MODULE_10__/* .addFriendRequestEntry */ .zP)({
                    friendRequest: {
                        uuid: from,
                        username: fromUsername,
                        reverse: true
                    }
                }));
            // toast({
            //   id: from,
            //   title: `${fromUsername} sent you a friend request.`,
            //   position: 'bottom-right',
            //   isClosable: true,
            //   status: 'success',
            //   duration: null,
            //   render: () => (
            //     <Flex direction="column" color="white" p={3} bg="green.500">
            //       <Flex>
            //         <p>{fromUsername} sent you a friend request.</p>
            //
            //         <CloseButton
            //           className="sticky top ml-4"
            //           size="sm"
            //           onClick={() => {
            //             toast.close(from)
            //           }}
            //           name="close button"
            //         />
            //       </Flex>
            //
            //       <Flex className="justify-end mt-3">
            //         <Button
            //           className="mr-3"
            //           onClick={async () => {
            //             const acceptFriendshipResponse =
            //               await acceptFriendRequest({
            //                 profileUuid: from,
            //               })
            //
            //             dispatch(
            //               setFriendFlagOnProfile({
            //                 profileUuid: from,
            //               })
            //             )
            //
            //             dispatch(
            //               removeFriendRequestEntry({
            //                 profileUuid: from,
            //                 friendRequests: loggedInUser.user?.friendshipRequests,
            //               })
            //             )
            //
            //             dispatch(
            //               addFriendEntry({
            //                 friend: {
            //                   uuid: from,
            //                   username: fromUsername,
            //                 },
            //               })
            //             )
            //
            //             console.log(
            //               'accept friend ship response:',
            //               acceptFriendshipResponse
            //             )
            //
            //             dispatch(
            //               addConversation({
            //                 conversation:
            //                   acceptFriendshipResponse.data?.acceptFriendRequest,
            //                 loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
            //               })
            //             )
            //
            //             if (acceptFriendshipResponse) {
            //               socket.emit('friendship-request-accepted', {
            //                 content:
            //                   loggedInUser.user?.profile?.username +
            //                   ' accepted your friend request.',
            //                 from: loggedInUser.user?.profile?.uuid,
            //                 fromUsername: loggedInUser.user?.profile?.username,
            //                 to: from,
            //                 toUsername: fromUsername,
            //                 conversation:
            //                   acceptFriendshipResponse.data?.acceptFriendRequest,
            //               })
            //             }
            //
            //             toast.close(from)
            //           }}
            //         >
            //           Accept
            //         </Button>
            //
            //         <Button>Reject</Button>
            //       </Flex>
            //     </Flex>
            //   ),
            // })
            });
            socket.on('unfriend', ({ from , conversationUuid  })=>{
                var ref;
                dispatch((0,_store_users__WEBPACK_IMPORTED_MODULE_10__/* .removeFriendEntry */ .ei)({
                    profileUuid: from,
                    friends: (ref = loggedInUser.user) === null || ref === void 0 ? void 0 : ref.friends
                }));
                dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .removeConversation */ .Ae)({
                    conversationUuid
                }));
                console.log('active conversation:', activeConversation);
                console.log('conversation uuid:', conversationUuid);
                if (activeConversation && activeConversation.uuid === conversationUuid) {
                    dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .setActiveConversationSet */ .bC)(false));
                    dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .setActiveConversee */ .HJ)(null));
                    dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .setActiveConversation */ .K4)(null));
                    dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .setShouldPauseCheckHasMore */ .J0)(false));
                }
            });
            socket.on('invited-to-group', ({ conversation  })=>{
                var ref, ref9;
                console.log('invited to group received:', conversation);
                dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .addConversation */ .V$)({
                    conversation,
                    loggedInProfileUuid: (ref = loggedInUser.user) === null || ref === void 0 ? void 0 : (ref9 = ref.profile) === null || ref9 === void 0 ? void 0 : ref9.uuid
                }));
            });
            socket.on('left-group', ({ fromUuid , conversationUuid  })=>{
                dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .removeParticipantFromGroup */ .fN)({
                    conversationUuid,
                    participantUuid: fromUuid
                }));
            });
            if (socket) {
                socket.on('set-pending-call-for-conversation', ({ conversationUuid , from  })=>{
                    var ref, ref10;
                    dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .setPendingCall */ .gu)({
                        profileUuid: (ref = loggedInUser.user) === null || ref === void 0 ? void 0 : (ref10 = ref.profile) === null || ref10 === void 0 ? void 0 : ref10.uuid,
                        from,
                        pendingCall: true,
                        ongoingCall: false,
                        conversationUuid
                    }));
                });
            }
        }
        return ()=>{
            if (socket) {
                socket.off('send-friend-request');
                socket.off('cancel-friend-request');
                socket.off('friendship-request-accepted');
                socket.off('unfriend');
                socket.off('set-pending-call-for-conversation');
            }
        };
    }, [
        socket
    ]);
    const handleSendGroupMessage = async ()=>{
        var ref25, ref11, ref12, ref13, ref14, ref15;
        if (!inputMessage.trim().length) {
            return;
        }
        const data = inputMessage;
        setInputMessage('');
        const message = await saveGroupMessage({
            message: data,
            type: 'text',
            src: '',
            conversationUuid: activeConversation.uuid
        });
        activeConversation.profiles.map((profile)=>{
            var ref, ref16;
            if (profile.uuid !== ((ref = loggedInUser.user) === null || ref === void 0 ? void 0 : (ref16 = ref.profile) === null || ref16 === void 0 ? void 0 : ref16.uuid)) {
                var ref17, ref18, ref19, ref20, ref21, ref22, ref23, ref24;
                socket.emit('private-chat-message', {
                    content: ((ref17 = loggedInUser.user) === null || ref17 === void 0 ? void 0 : (ref18 = ref17.profile) === null || ref18 === void 0 ? void 0 : ref18.username) + ' sent you a message.',
                    from: (ref19 = loggedInUser.user) === null || ref19 === void 0 ? void 0 : (ref20 = ref19.profile) === null || ref20 === void 0 ? void 0 : ref20.uuid,
                    fromUsername: (ref21 = loggedInUser.user) === null || ref21 === void 0 ? void 0 : (ref22 = ref21.profile) === null || ref22 === void 0 ? void 0 : ref22.username,
                    to: profile.uuid,
                    toUsername: profile.username,
                    messageUuid: (ref23 = message.data) === null || ref23 === void 0 ? void 0 : (ref24 = ref23.saveGroupMessage) === null || ref24 === void 0 ? void 0 : ref24.uuid,
                    message: data,
                    type: 'text',
                    src: '',
                    conversationUuid: activeConversation.uuid
                });
            }
        });
        dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .addMessageToActiveConversation */ .Yn)({
            uuid: (ref25 = message.data) === null || ref25 === void 0 ? void 0 : (ref11 = ref25.saveGroupMessage) === null || ref11 === void 0 ? void 0 : ref11.uuid,
            message: data,
            sender: {
                uuid: loggedInUser === null || loggedInUser === void 0 ? void 0 : (ref12 = loggedInUser.user) === null || ref12 === void 0 ? void 0 : (ref13 = ref12.profile) === null || ref13 === void 0 ? void 0 : ref13.uuid,
                username: loggedInUser === null || loggedInUser === void 0 ? void 0 : (ref14 = loggedInUser.user) === null || ref14 === void 0 ? void 0 : (ref15 = ref14.profile) === null || ref15 === void 0 ? void 0 : ref15.username
            },
            from: 'me',
            type: 'text',
            src: '',
            conversationUuid: activeConversation.uuid
        }));
    };
    const handleSendMessage = async ()=>{
        var ref, ref26, ref27, ref28, ref29, ref30, ref31, ref32, ref33, ref34, ref35, ref36, ref37, ref38;
        if (!inputMessage.trim().length) {
            return;
        }
        const data = inputMessage;
        setInputMessage('');
        const message = await saveMessage({
            message: data,
            type: 'text',
            src: '',
            conversationUuid: activeConversation.uuid,
            to: profile1.uuid
        });
        socket.emit('private-chat-message', {
            content: ((ref = loggedInUser.user) === null || ref === void 0 ? void 0 : (ref26 = ref.profile) === null || ref26 === void 0 ? void 0 : ref26.username) + ' sent you a message.',
            from: (ref27 = loggedInUser.user) === null || ref27 === void 0 ? void 0 : (ref28 = ref27.profile) === null || ref28 === void 0 ? void 0 : ref28.uuid,
            fromUsername: (ref29 = loggedInUser.user) === null || ref29 === void 0 ? void 0 : (ref30 = ref29.profile) === null || ref30 === void 0 ? void 0 : ref30.username,
            to: profile1.uuid,
            toUsername: profile1.username,
            messageUuid: (ref31 = message.data) === null || ref31 === void 0 ? void 0 : (ref32 = ref31.saveMessage) === null || ref32 === void 0 ? void 0 : ref32.uuid,
            message: data,
            type: 'text',
            src: '',
            conversationUuid: activeConversation.uuid
        });
        dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .addMessageToActiveConversation */ .Yn)({
            uuid: (ref33 = message.data) === null || ref33 === void 0 ? void 0 : (ref34 = ref33.saveMessage) === null || ref34 === void 0 ? void 0 : ref34.uuid,
            message: data,
            sender: {
                uuid: loggedInUser === null || loggedInUser === void 0 ? void 0 : (ref35 = loggedInUser.user) === null || ref35 === void 0 ? void 0 : (ref36 = ref35.profile) === null || ref36 === void 0 ? void 0 : ref36.uuid,
                username: loggedInUser === null || loggedInUser === void 0 ? void 0 : (ref37 = loggedInUser.user) === null || ref37 === void 0 ? void 0 : (ref38 = ref37.profile) === null || ref38 === void 0 ? void 0 : ref38.username
            },
            from: 'me',
            type: 'text',
            src: '',
            conversationUuid: activeConversation.uuid
        }));
    };
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
        className: "flex-col bg-gray-700 text-white box-content relative",
        style: {
            flex: '0.75',
            height: '100vh',
            overflow: 'hidden'
        },
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ChatControlsAndSearch__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z, {}),
            isCreateGroupOpen ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
                className: "flex-col p-0 box-content",
                style: {
                    height: chatContainerHeight,
                    transition: 'all .5s'
                },
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_CreateGroup__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .Z, {})
            }) : null,
            activeConversation && activeConversation.type === 'group' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
                className: "flex-col p-0 box-content",
                style: {
                    height: chatContainerHeight,
                    transition: 'all .5s'
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Header__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {}),
                    videoFrameOpenState !== true ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_FileUpload__WEBPACK_IMPORTED_MODULE_14__/* .FileUpload */ .p, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Messages__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {})
                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Video__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .Z, {
                        conversationUuid: activeConversation.uuid,
                        profile: (ref6 = loggedInUser.user) === null || ref6 === void 0 ? void 0 : ref6.profile,
                        email: (ref1 = loggedInUser.user) === null || ref1 === void 0 ? void 0 : ref1.email
                    })
                ]
            }) : null,
            profile1 && activeConversation && activeConversation.type === 'pm' ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
                className: "flex-col p-0 box-content",
                style: {
                    height: chatContainerHeight,
                    transition: 'all .5s'
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Header__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {}),
                    videoFrameOpenState !== true ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_FileUpload__WEBPACK_IMPORTED_MODULE_14__/* .FileUpload */ .p, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Messages__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {})
                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Video__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .Z, {
                        conversationUuid: activeConversation.uuid,
                        profile: (ref2 = loggedInUser.user) === null || ref2 === void 0 ? void 0 : ref2.profile,
                        email: (ref3 = loggedInUser.user) === null || ref3 === void 0 ? void 0 : ref3.email
                    })
                ]
            }) : null,
            activeConversation ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
                w: "100%",
                flexDir: "column",
                className: "justify-center",
                style: {
                    height: '7.5vh'
                },
                children: activeConversation.type === 'pm' ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Footer__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                    inputMessage: inputMessage,
                    setInputMessage: setInputMessage,
                    handleSendMessage: handleSendMessage
                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Footer__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                    inputMessage: inputMessage,
                    setInputMessage: setInputMessage,
                    handleSendMessage: handleSendGroupMessage
                })
            }) : null
        ]
    }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Chat);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3089:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ noon_ChatControlsAndSearch)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "@chakra-ui/react"
var react_ = __webpack_require__(8930);
// EXTERNAL MODULE: external "@chakra-ui/icons"
var icons_ = __webpack_require__(4513);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: external "@reduxjs/toolkit"
var toolkit_ = __webpack_require__(5184);
// EXTERNAL MODULE: external "reselect"
var external_reselect_ = __webpack_require__(6814);
;// CONCATENATED MODULE: ./src/store/search.js


const slice = (0,toolkit_.createSlice)({
    name: 'search',
    initialState: {
        query: null,
        profiles: null
    },
    reducers: {
        setSearchQuery: (search, action)=>{
            console.log('action payloa:', action.payload);
            search.query = action.payload;
        },
        setProfiles: (search, action)=>{
            let profilesArray = [];
            console.log('profiles:', action.payload.profiles);
            if (action.payload.profiles == null) {
                search.profiles = null;
            } else {
                action.payload.profiles.map((profile)=>{
                    let profileObject = {
                        ...profile
                    };
                    const friendsCheck = action.payload.loggedInUser.user.friends.find((element)=>element.uuid == profileObject.uuid
                    );
                    const friendshipRequestCheck = action.payload.loggedInUser.user.friendshipRequests.find((element)=>element.uuid == profileObject.uuid
                    );
                    // const reverseFriendshipCheck = profile.friendshipRequests.find()
                    profileObject.isAFriend = !!friendsCheck;
                    if (friendshipRequestCheck === null || friendshipRequestCheck === void 0 ? void 0 : friendshipRequestCheck.reverse) {
                        profileObject.hasSentFriendshipRequestToProfile = true;
                    } else if (friendshipRequestCheck) {
                        profileObject.hasFriendshipRequestFromLoggedInProfile = true;
                    }
                    console.log('PROFILE OBJECT:', profileObject);
                    profilesArray.push(profileObject);
                });
                search.profiles = profilesArray;
            }
        // action.payload.profiles = action.payload.profiles.filter(
        //   (profile) =>
        //     profile.uuid != action.payload.loggedInUser.user.profile.uuid
        // )
        }
    }
});
const getSearchQuery = (0,external_reselect_.createSelector)((state)=>state.entities.search
, (search)=>search.query
);
const getProfiles = (0,external_reselect_.createSelector)((state)=>state.entities.search
, (search)=>search.profiles
);
const { setProfiles , setSearchQuery  } = slice.actions;
/* harmony default export */ const search = (slice.reducer);

// EXTERNAL MODULE: ./src/generated/graphql.tsx
var graphql = __webpack_require__(9402);
;// CONCATENATED MODULE: ./src/store/profiles.js


let lastId = 0;
const profiles_slice = (0,toolkit_.createSlice)({
    name: 'profiles',
    initialState: {
        list: []
    },
    reducers: {
        addProfiles: (profiles, action, loggedInUser)=>{
            // let profilesArray = [...action.payload.profiles]
            let profilesArray = [];
            if (action.payload.profiles == null) {
                profiles.list = null;
            } else {
                action.payload.profiles = action.payload.profiles.filter((profile)=>profile.uuid != action.payload.loggedInUser.user.profile.uuid
                );
                action.payload.profiles.map((profile)=>{
                    let profileObject = {
                        ...profile
                    };
                    const friendsCheck = action.payload.loggedInUser.user.friends.find((element)=>element.uuid == profileObject.uuid
                    );
                    const friendshipRequestCheck = action.payload.loggedInUser.user.friendshipRequests.find((element)=>element.uuid == profileObject.uuid
                    );
                    // const reverseFriendshipCheck = profile.friendshipRequests.find()
                    profileObject.isAFriend = !!friendsCheck;
                    if (friendshipRequestCheck === null || friendshipRequestCheck === void 0 ? void 0 : friendshipRequestCheck.reverse) {
                        profileObject.hasFriendshipRequestFromLoggedInProfile = true;
                    } else if (friendshipRequestCheck) {
                        profileObject.hasSentFriendshipRequestToProfile = true;
                    }
                    // if (friendshipRequestCheck?.reverse) {
                    //   profileObject.hasSentFriendshipRequestToProfile = true
                    // } else if (friendshipRequestCheck) {
                    //   profileObject.hasFriendshipRequestFromLoggedInProfile = true
                    // }
                    console.log('PROFILE OBJECT:', profileObject);
                    profilesArray.push(profileObject);
                });
                profiles.list = profilesArray;
            }
        },
        setFriendshipRequestSentOnProfile: (profiles, action)=>{
            let profile1 = profiles.list.find((profile)=>profile.uuid == action.payload.profileUuid
            );
            profile1.hasSentFriendshipRequestToProfile = true;
        },
        cancelFriendshipRequestSentOnProfile: (profiles, action)=>{
            let profile2 = profiles.list.find((profile)=>profile.uuid == action.payload.profileUuid
            );
            profile2.hasSentFriendshipRequestToProfile = false;
        },
        setHasFriendshipRequestFromLoggedInProfile: (profiles, action)=>{
            let profile3 = profiles.list.find((profile)=>profile.uuid == action.payload.profileUuid
            );
            profile3.hasFriendshipRequestFromLoggedInProfile = true;
        },
        unsetHasFriendshipRequestFromLoggedInProfile: (profiles, action)=>{
            let profile4 = profiles.list.find((profile)=>profile.uuid == action.payload.profileUuid
            );
            profile4.hasFriendshipRequestFromLoggedInProfile = false;
        },
        setFriendFlagOnProfile: (profiles, action)=>{
            var ref;
            if (profiles.list !== null && ((ref = profiles.list) === null || ref === void 0 ? void 0 : ref.length) !== 0) {
                let profile5 = profiles.list.find((profile)=>profile.uuid == action.payload.profileUuid
                );
                profile5.isAFriend = true;
                profile5.hasFriendshipRequestFromLoggedInProfile = false;
                profile5.hasSentFriendshipRequestToProfile = false;
            }
        },
        unsetFriendFlagOnProfile: (profiles, action)=>{
            let profile7 = profiles.list.find((profile)=>profile.uuid == action.payload.profileUuid
            );
            profile7.isAFriend = true;
        },
        addProfile: (profiles, action)=>{
            const { profile  } = action.payload;
            profiles.list = {
                ...profiles.list,
                [profile.uuid]: profile
            };
        }
    }
});
const profiles_getProfiles = (0,external_reselect_.createSelector)((state)=>state.entities.profiles
, (profiles)=>profiles.list
);
const { addProfile , addProfiles , setFriendshipRequestSentOnProfile , cancelFriendshipRequestSentOnProfile , setFriendFlagOnProfile , setHasFriendshipRequestFromLoggedInProfile , unsetHasFriendshipRequestFromLoggedInProfile ,  } = profiles_slice.actions;
/* harmony default export */ const profiles = (profiles_slice.reducer);

// EXTERNAL MODULE: ./src/store/users.js
var users = __webpack_require__(5565);
// EXTERNAL MODULE: ./src/store/sockets.js
var sockets = __webpack_require__(6135);
// EXTERNAL MODULE: ./src/store/chat.js + 1 modules
var chat = __webpack_require__(7917);
;// CONCATENATED MODULE: ./src/pages/noon/Profile.tsx










// interface ProfileProps {
//   uuid: string
//   username: string
//   name: string
//   userId: string
//   updatedAt: Date
//   createdAt: Date
// }
function Profile({ profile  }) {
    const dispatch = (0,external_react_redux_.useDispatch)();
    const loggedInUser = (0,external_react_redux_.useSelector)(users/* getLoggedInUser */.r);
    const [, acceptFriendRequest] = (0,graphql/* useAcceptFriendRequestMutation */.r9)();
    // const [, refuseFriendRequest] = useRefuseFriendRequestMutation()
    const [, cancelFriendRequest] = (0,graphql/* useCancelFriendRequestMutation */.Gk)();
    const [, sendFriendRequest] = (0,graphql/* useSendFriendRequestMutation */.Gx)();
    const socket = (0,external_react_redux_.useSelector)(sockets/* getSocket */.hb);
    const toast = (0,react_.useToast)();
    // const toastIdRef = React.useRef()
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Flex, {
        className: "items-center w-full justify-between relative h-12 ",
        style: {
            flex: '1'
        },
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Flex, {
                className: "items-center ",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(react_.Avatar, {
                        name: profile.username,
                        size: "sm",
                        className: "mr-2"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: "",
                        children: profile.username
                    })
                ]
            }),
            profile.hasSentFriendshipRequestToProfile ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Flex, {
                className: "relative",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(react_.Button, {
                        disabled: true,
                        className: "relative text-green-500 p-0",
                        style: {
                            borderRadius: '5px 0px 0px 5px'
                        },
                        children: "Friendship request sent"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(react_.Button, {
                        disabled: false,
                        className: "absolute bg-red-500 text-white",
                        bg: "red",
                        style: {
                            borderRadius: '0px 5px 5px 0px'
                        },
                        onClick: async ()=>{
                            var ref;
                            const cancelFriendRequestResponse = await cancelFriendRequest({
                                profileUuid: profile.uuid
                            });
                            dispatch(cancelFriendshipRequestSentOnProfile({
                                profileUuid: profile.uuid
                            }));
                            dispatch((0,users/* removeFriendRequestEntry */.t9)({
                                profileUuid: profile.uuid,
                                friendRequests: (ref = loggedInUser.user) === null || ref === void 0 ? void 0 : ref.friendshipRequests
                            }));
                            if (cancelFriendRequestResponse) {
                                var ref1, ref2, ref3, ref4, ref5, ref6;
                                socket.emit('cancel-friend-request', {
                                    content: ((ref1 = loggedInUser.user) === null || ref1 === void 0 ? void 0 : (ref2 = ref1.profile) === null || ref2 === void 0 ? void 0 : ref2.username) + ' cancelled the friend request.',
                                    from: (ref3 = loggedInUser.user) === null || ref3 === void 0 ? void 0 : (ref4 = ref3.profile) === null || ref4 === void 0 ? void 0 : ref4.uuid,
                                    fromUsername: (ref5 = loggedInUser.user) === null || ref5 === void 0 ? void 0 : (ref6 = ref5.profile) === null || ref6 === void 0 ? void 0 : ref6.username,
                                    to: profile.uuid,
                                    toUsername: profile.username
                                });
                            }
                        },
                        children: "Cancel"
                    })
                ]
            }) : profile.hasFriendshipRequestFromLoggedInProfile ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Flex, {
                className: "justify-end mt-3",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(react_.Button, {
                        className: "mr-3 bg-green-500",
                        variant: "ghost",
                        onClick: async ()=>{
                            var ref, ref7, ref8, ref9;
                            const acceptFriendshipResponse = await acceptFriendRequest({
                                profileUuid: profile.uuid
                            });
                            dispatch((0,users/* removeFriendRequestEntry */.t9)({
                                profileUuid: profile.uuid,
                                friendRequests: (ref = loggedInUser.user) === null || ref === void 0 ? void 0 : ref.friendshipRequests
                            }));
                            dispatch((0,users/* addFriendEntry */.cY)({
                                friend: {
                                    uuid: profile.uuid,
                                    username: profile.username
                                }
                            }));
                            dispatch((0,chat/* addConversation */.V$)({
                                conversation: (ref7 = acceptFriendshipResponse.data) === null || ref7 === void 0 ? void 0 : ref7.acceptFriendRequest,
                                loggedInProfileUuid: (ref8 = loggedInUser.user) === null || ref8 === void 0 ? void 0 : (ref9 = ref8.profile) === null || ref9 === void 0 ? void 0 : ref9.uuid
                            }));
                            //
                            if (acceptFriendshipResponse) {
                                var ref10, ref11, ref12, ref13, ref14, ref15, ref16;
                                socket.emit('friendship-request-accepted', {
                                    content: ((ref10 = loggedInUser.user) === null || ref10 === void 0 ? void 0 : (ref11 = ref10.profile) === null || ref11 === void 0 ? void 0 : ref11.username) + ' accepted your friend request.',
                                    from: (ref12 = loggedInUser.user) === null || ref12 === void 0 ? void 0 : (ref13 = ref12.profile) === null || ref13 === void 0 ? void 0 : ref13.uuid,
                                    fromUsername: (ref14 = loggedInUser.user) === null || ref14 === void 0 ? void 0 : (ref15 = ref14.profile) === null || ref15 === void 0 ? void 0 : ref15.username,
                                    to: profile.uuid,
                                    toUsername: profile.username,
                                    conversation: (ref16 = acceptFriendshipResponse.data) === null || ref16 === void 0 ? void 0 : ref16.acceptFriendRequest
                                });
                            }
                            // if (toastIdRef.current) {
                            toast.close(profile.uuid);
                        // }
                        },
                        children: "Accept"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(react_.Button, {
                        className: "bg-red-500",
                        variant: "tomato",
                        children: "Reject"
                    })
                ]
            }) : /*#__PURE__*/ jsx_runtime_.jsx(react_.Box, {
                children: profile.isAFriend ? /*#__PURE__*/ jsx_runtime_.jsx(react_.Flex, {
                    className: "w-full z-40 h-full cursor-pointer",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(icons_.ChatIcon, {
                        className: "mr-3 mt-1",
                        onClick: ()=>{
                        // setActiveConverseeFunction(profile)
                        }
                    })
                }) : /*#__PURE__*/ jsx_runtime_.jsx(react_.Button, {
                    onClick: async ()=>{
                        var ref, ref17, ref18, ref19, ref20, ref21;
                        dispatch(setFriendshipRequestSentOnProfile({
                            profileUuid: profile.uuid
                        }));
                        dispatch((0,users/* addFriendRequestEntry */.zP)({
                            friendRequest: {
                                uuid: profile.uuid,
                                username: profile.username,
                                reverse: false
                            }
                        }));
                        await sendFriendRequest({
                            profileUuid: profile.uuid
                        });
                        socket.emit('send-friend-request', {
                            content: ((ref = loggedInUser.user) === null || ref === void 0 ? void 0 : (ref17 = ref.profile) === null || ref17 === void 0 ? void 0 : ref17.username) + ' wants to be your friend.',
                            from: (ref18 = loggedInUser.user) === null || ref18 === void 0 ? void 0 : (ref19 = ref18.profile) === null || ref19 === void 0 ? void 0 : ref19.uuid,
                            fromUsername: (ref20 = loggedInUser.user) === null || ref20 === void 0 ? void 0 : (ref21 = ref20.profile) === null || ref21 === void 0 ? void 0 : ref21.username,
                            to: profile.uuid,
                            toUsername: profile.username
                        });
                    },
                    children: "Send friend request"
                })
            })
        ]
    }, profile.uuid));
};

;// CONCATENATED MODULE: ./src/pages/noon/SearchController.tsx









function SearchController() {
    const dispatch = (0,external_react_redux_.useDispatch)();
    const loggedInUser = (0,external_react_redux_.useSelector)(users/* getLoggedInUser */.r);
    const searchQuery = (0,external_react_redux_.useSelector)(getSearchQuery);
    const profilesFromStore = (0,external_react_redux_.useSelector)(profiles_getProfiles);
    const [{ data  }] = (0,graphql/* useSearchForProfileByUsernameQuery */.Rh)({
        variables: {
            username: searchQuery
        }
    });
    (0,external_react_.useEffect)(()=>{
        if ((data === null || data === void 0 ? void 0 : data.searchForProfileByUsername) && loggedInUser.user) {
            dispatch(addProfiles({
                profiles: data === null || data === void 0 ? void 0 : data.searchForProfileByUsername,
                loggedInUser
            }));
        }
        return ()=>{
            dispatch(addProfiles({
                profiles: null,
                loggedInUser
            }));
        };
    }, [
        data === null || data === void 0 ? void 0 : data.searchForProfileByUsername,
        loggedInUser
    ]);
    console.log('search results:', data === null || data === void 0 ? void 0 : data.searchForProfileByUsername);
    return(/*#__PURE__*/ jsx_runtime_.jsx(react_.Flex, {
        className: "w-full",
        children: profilesFromStore ? [
            ...Object.values(profilesFromStore)
        ].map((profile, i)=>!profile ? null : /*#__PURE__*/ jsx_runtime_.jsx(Profile, {
                profile: profile
            }, i)
        ) : null
    }));
};

// EXTERNAL MODULE: ./src/store/ui.js
var ui = __webpack_require__(9224);
;// CONCATENATED MODULE: ./src/pages/noon/ChatControlsAndSearch.tsx





// import { getActiveConversee } from '../../store/chat'



function ChatControlsAndSearch() {
    const ref = external_react_default().useRef();
    const dispatch = (0,external_react_redux_.useDispatch)();
    // const profile = useSelector(getActiveConversee)
    const searchQuery = (0,external_react_redux_.useSelector)(getSearchQuery);
    const searchComponentState = (0,external_react_redux_.useSelector)(ui/* getSearchComponentState */.Rg);
    const { 0: searchInput , 1: setSearchInput  } = (0,external_react_.useState)(null);
    (0,react_.useOutsideClick)({
        ref: ref,
        handler: ()=>{
            dispatch(setSearchQuery(null));
            setSearchInput(null);
            dispatch((0,ui/* setSearchComponent */.JD)({
                searchActive: false,
                containerDisplay: 'relative',
                containerHeight: '5vh',
                inputPadding: '5px'
            }));
            dispatch((0,ui/* setChatContainerHeight */.Ov)('87.5vh'));
        }
    });
    return(/*#__PURE__*/ jsx_runtime_.jsx(react_.Flex, {
        ref: ref.current,
        className: "flex-col border-b px-3 w-full ",
        style: {
            position: searchComponentState.containerDisplay,
            height: searchComponentState.containerHeight,
            transition: 'all .5s',
            marginTop: '+0.5px'
        },
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Flex, {
            className: "px-3 justify-center h-full w-full",
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Flex, {
                    className: "flex-col items-start justify-start",
                    style: {
                        flex: '0.7'
                    },
                    children: [
                        searchComponentState.searchActive ? /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            className: "text-xl mt-4 mb-10",
                            children: "Search Results"
                        }) : null,
                        searchInput && searchComponentState.searchActive ? /*#__PURE__*/ jsx_runtime_.jsx(react_.Flex, {
                            className: "w-full",
                            style: {
                                flex: '1'
                            },
                            children: /*#__PURE__*/ jsx_runtime_.jsx(SearchController, {})
                        }) : null
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(react_.Flex, {
                    className: "items-center relative ",
                    style: {
                        flex: '0.3'
                    },
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.InputGroup, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(react_.InputRightElement, {
                                pointerEvents: "none"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(icons_.SearchIcon, {
                                color: "gray.300"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(react_.Input, {
                                type: "text",
                                className: "m-0 focus:bg-base-100 bg-transparent outline-0 bg-gray-800 pl-2",
                                placeholder: "Search for profiles...",
                                size: "md",
                                onClick: ()=>{
                                    dispatch((0,ui/* setChatContainerHeight */.Ov)('52.5vh'));
                                    dispatch((0,ui/* setSearchComponent */.JD)({
                                        searchActive: true,
                                        containerDisplay: 'relative',
                                        containerHeight: '40vh',
                                        inputPadding: '10px'
                                    }));
                                },
                                style: {
                                    padding: searchComponentState.inputPadding,
                                    transition: 'all .5s',
                                    position: searchComponentState.containerDisplay,
                                    right: 0
                                },
                                onKeyPress: (e)=>{
                                    if (e.key === 'Enter') {
                                        if (e.target.value !== searchQuery) {
                                            dispatch(setSearchQuery(null));
                                            setSearchInput(null);
                                            dispatch(setSearchQuery(e.target.value));
                                            setSearchInput(e.target.value);
                                        }
                                    }
                                }
                            })
                        ]
                    })
                }),
                searchComponentState.searchActive ? /*#__PURE__*/ jsx_runtime_.jsx(icons_.ArrowUpIcon, {
                    className: "bg-black p-1 absolute top-0 right-0 m-4 text-2xl cursor-pointer",
                    onClick: ()=>{
                        dispatch(setSearchQuery(null));
                        setSearchInput(null);
                        dispatch((0,ui/* setSearchComponent */.JD)({
                            searchActive: false,
                            containerDisplay: 'relative',
                            containerHeight: '5vh',
                            inputPadding: '5px'
                        }));
                        dispatch((0,ui/* setChatContainerHeight */.Ov)('87.5vh'));
                    }
                }) : null
            ]
        })
    }));
}
/* harmony default export */ const noon_ChatControlsAndSearch = (ChatControlsAndSearch);


/***/ }),

/***/ 6405:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ noon_CreateGroup)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "@chakra-ui/react"
var react_ = __webpack_require__(8930);
// EXTERNAL MODULE: external "formik"
var external_formik_ = __webpack_require__(2296);
// EXTERNAL MODULE: ./src/store/chat.js + 1 modules
var chat = __webpack_require__(7917);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: ./src/store/users.js
var users = __webpack_require__(5565);
// EXTERNAL MODULE: ./src/store/sockets.js
var sockets = __webpack_require__(6135);
// EXTERNAL MODULE: external "@reduxjs/toolkit"
var toolkit_ = __webpack_require__(5184);
// EXTERNAL MODULE: external "reselect"
var external_reselect_ = __webpack_require__(6814);
;// CONCATENATED MODULE: ./src/store/groups.js


let lastId = 0;
const slice = (0,toolkit_.createSlice)({
    name: 'groups',
    initialState: {
        groups: null,
        groupBeingCreated: null,
        participants: []
    },
    reducers: {
        createGroup: (groups, action)=>{
            groups.push({
                id: ++lastId,
                name: action.payload.name
            });
        },
        clearState: (groups, action)=>{
            groups.participants = [];
            groups.groupBeingCreated = null;
        },
        addParticipants: (groups, action)=>{
            groups.participants.push(action.payload);
        },
        removeParticipants: (groups, action)=>{
            const temp = [
                ...groups.participants
            ];
            temp.splice(temp.indexOf(action.payload), 1);
            groups.participants = temp;
        }
    }
});
const getGroups = (0,external_reselect_.createSelector)((state)=>state.entities.groups
, (groups)=>groups.groups
);
const getParticipants = (0,external_reselect_.createSelector)((state)=>state.entities.groups
, (groups)=>groups.participants
);
const { createGroup , addParticipants , removeParticipants , clearState  } = slice.actions;
/* harmony default export */ const groups = (slice.reducer);

;// CONCATENATED MODULE: ./src/components/GroupParticipant.tsx




// import { getLoggedInUser } from '../../store/users'
// import { getSocket } from '../../store/sockets'

const GroupParticipant = ({ participant  })=>{
    // const dispatch = useDispatch()
    // const socket = useSelector(getSocket)
    const dispatch = (0,external_react_redux_.useDispatch)();
    // const [active, setActive] = useState(false)
    const { 0: participantsColor , 1: setParticipantsColor  } = (0,external_react_.useState)('');
    return(/*#__PURE__*/ jsx_runtime_.jsx(react_.Flex, {
        className: "p-2 cursor:pointer hover:text-black text-white cursor-pointer",
        style: {
            backgroundColor: participantsColor
        },
        onClick: ()=>{
            if (participantsColor === '') {
                setParticipantsColor('green');
                dispatch(addParticipants(participant.uuid));
            } else {
                setParticipantsColor('');
                dispatch(removeParticipants(participant.uuid));
            }
        },
        children: participant.username
    }));
};
/* harmony default export */ const components_GroupParticipant = (GroupParticipant);

// EXTERNAL MODULE: ./src/generated/graphql.tsx
var graphql = __webpack_require__(9402);
// EXTERNAL MODULE: ./src/store/ui.js
var ui = __webpack_require__(9224);
;// CONCATENATED MODULE: ./src/pages/noon/CreateGroup.tsx












const CreateGroup = ({})=>{
    const dispatch = (0,external_react_redux_.useDispatch)();
    const socket = (0,external_react_redux_.useSelector)(sockets/* getSocket */.hb);
    const participants = (0,external_react_redux_.useSelector)(getParticipants);
    const loggedInUser = (0,external_react_redux_.useSelector)(users/* getLoggedInUser */.r);
    const { 0: friends , 1: setFriends  } = (0,external_react_.useState)(null);
    const [, createGroupConversation] = (0,graphql/* useCreateGroupConversationMutation */.yW)();
    (0,external_react_.useEffect)(()=>{
        var ref;
        setFriends(loggedInUser === null || loggedInUser === void 0 ? void 0 : (ref = loggedInUser.user) === null || ref === void 0 ? void 0 : ref.friends);
        if (socket) {
            socket.on('set-ongoing-call-for-conversation', ({ from , fromUsername  })=>{
                dispatch((0,chat/* setOngoingCall */.lT)({
                    uuid: '',
                    initiator: {
                        uuid: from,
                        username: fromUsername
                    }
                }));
            });
        }
        return ()=>{
            if (socket) socket.off('set-ongoing-call-for-conversation');
        };
    }, []);
    const formik = (0,external_formik_.useFormik)({
        initialValues: {
            name: '',
            description: ''
        },
        onSubmit: async (values)=>{
            if (participants.length !== 0) {
                var ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, ref10;
                const participantsToSend = [
                    ...participants
                ];
                participantsToSend.push((ref = loggedInUser.user) === null || ref === void 0 ? void 0 : (ref1 = ref.profile) === null || ref1 === void 0 ? void 0 : ref1.uuid);
                const conversation = await createGroupConversation({
                    input: {
                        ...values,
                        type: 'group'
                    },
                    participants: participantsToSend
                });
                dispatch(clearState(null));
                socket.emit('group-created', {
                    fromUuid: (ref2 = loggedInUser.user) === null || ref2 === void 0 ? void 0 : (ref3 = ref2.profile) === null || ref3 === void 0 ? void 0 : ref3.uuid,
                    fromUsername: (ref4 = loggedInUser.user) === null || ref4 === void 0 ? void 0 : (ref5 = ref4.profile) === null || ref5 === void 0 ? void 0 : ref5.username,
                    groupUuid: (ref6 = conversation.data) === null || ref6 === void 0 ? void 0 : ref6.createGroupConversation.uuid,
                    conversation: (ref7 = conversation.data) === null || ref7 === void 0 ? void 0 : ref7.createGroupConversation,
                    participants: participantsToSend
                });
                console.log('conversation:', conversation);
                dispatch((0,chat/* addConversation */.V$)({
                    conversation: (ref8 = conversation.data) === null || ref8 === void 0 ? void 0 : ref8.createGroupConversation,
                    loggedInProfileUuid: (ref9 = loggedInUser.user) === null || ref9 === void 0 ? void 0 : (ref10 = ref9.profile) === null || ref10 === void 0 ? void 0 : ref10.uuid
                }));
                dispatch((0,ui/* setCreateGroupComponent */.iD)(false));
            }
        }
    });
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Flex, {
        className: "flex-col w-full py-3 px-5 relative box-content h-full",
        style: {
            height: '70vh'
        },
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Flex, {
                className: "w-full justify-between",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: "mb-5",
                        children: "Create Group"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(react_.Button, {
                        className: "mr-8",
                        onClick: ()=>{
                            dispatch((0,ui/* setCreateGroupComponent */.iD)(false));
                        },
                        children: "X"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Flex, {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("form", {
                        className: "flex w-2/4",
                        onSubmit: formik.handleSubmit,
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Flex, {
                            className: "mr-5",
                            direction: "column",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Box, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                            children: "Group name"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(react_.Input, {
                                            name: "name",
                                            type: "text",
                                            label: "Group name",
                                            onChange: formik.handleChange,
                                            value: formik.values.name
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Box, {
                                    mt: 4,
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                            children: "Group description"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(react_.Input, {
                                            name: "description",
                                            type: "text",
                                            label: "Group description",
                                            onChange: formik.handleChange,
                                            value: formik.values.description
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(react_.Button, {
                                    // isLoading={isSubmitting}
                                    mt: 4,
                                    type: "submit",
                                    colorScheme: "teal",
                                    className: "box-content",
                                    children: "create group"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Flex, {
                        className: "flex-col text-black w-2/4 box-content",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: "text-white",
                                children: "Add friends"
                            }),
                            friends ? friends.map((friend)=>/*#__PURE__*/ jsx_runtime_.jsx(components_GroupParticipant, {
                                    participant: friend
                                }, friend.uuid)
                            ) : null
                        ]
                    })
                ]
            })
        ]
    }));
};
/* harmony default export */ const noon_CreateGroup = (CreateGroup);


/***/ }),

/***/ 5157:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "p": () => (/* binding */ FileUpload)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dropzone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6358);
/* harmony import */ var react_dropzone__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dropzone__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store_users__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5565);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var form_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8941);
/* harmony import */ var form_data__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(form_data__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6555);
/* harmony import */ var _store_sockets__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6135);
/* harmony import */ var _store_chat__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7917);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([uuid__WEBPACK_IMPORTED_MODULE_7__]);
uuid__WEBPACK_IMPORTED_MODULE_7__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




// import {
//   useSaveMessageMutation,
//   useUploadImageMutation,
// } from '../../generated/graphql'






const FileUpload = ({ children  })=>{
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
    const loggedInUser = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(_store_users__WEBPACK_IMPORTED_MODULE_4__/* .getLoggedInUser */ .r);
    const activeConversation = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(_store_chat__WEBPACK_IMPORTED_MODULE_9__/* .getActiveConversation */ .tI);
    const profile = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(_store_chat__WEBPACK_IMPORTED_MODULE_9__/* .getActiveConversee */ .PY);
    const socket = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(_store_sockets__WEBPACK_IMPORTED_MODULE_8__/* .getSocket */ .hb);
    // const [, saveMessage] = useSaveMessageMutation()
    const { acceptedFiles , getRootProps  } = (0,react_dropzone__WEBPACK_IMPORTED_MODULE_3__.useDropzone)();
    // const [, uploadImage] = useUploadImageMutation()
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (acceptedFiles.length !== 0) {
            var ref18, ref1;
            const file = acceptedFiles[0];
            const formData = new (form_data__WEBPACK_IMPORTED_MODULE_6___default())();
            formData.append('file', file, 'file');
            formData.append('conversationUuid', activeConversation.uuid);
            formData.append('messageUuid', (0,uuid__WEBPACK_IMPORTED_MODULE_7__.v4)());
            formData.append('senderUuid', (ref18 = loggedInUser.user) === null || ref18 === void 0 ? void 0 : (ref1 = ref18.profile) === null || ref1 === void 0 ? void 0 : ref1.uuid);
            axios__WEBPACK_IMPORTED_MODULE_5___default().post('http://localhost:4020/media_api/upload_image', formData, {
                headers: {
                    accept: 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
                }
            }).then(async (response)=>{
                var ref20, ref2, ref3, ref4;
                if (activeConversation.type === 'pm') {
                    var ref5, ref6, ref7, ref8, ref9, ref10;
                    socket.emit('private-chat-message', {
                        content: ((ref5 = loggedInUser.user) === null || ref5 === void 0 ? void 0 : (ref6 = ref5.profile) === null || ref6 === void 0 ? void 0 : ref6.username) + ' sent you a message.',
                        from: (ref7 = loggedInUser.user) === null || ref7 === void 0 ? void 0 : (ref8 = ref7.profile) === null || ref8 === void 0 ? void 0 : ref8.uuid,
                        fromUsername: (ref9 = loggedInUser.user) === null || ref9 === void 0 ? void 0 : (ref10 = ref9.profile) === null || ref10 === void 0 ? void 0 : ref10.username,
                        to: profile.uuid,
                        toUsername: profile.username,
                        messageUuid: response.data.uuid,
                        message: response.data.content,
                        type: response.data.type,
                        src: response.data.src,
                        conversationUuid: activeConversation.uuid
                    });
                } else {
                    activeConversation.profiles.map((conversationProfile)=>{
                        var ref, ref11;
                        if (conversationProfile.uuid !== ((ref = loggedInUser.user) === null || ref === void 0 ? void 0 : (ref11 = ref.profile) === null || ref11 === void 0 ? void 0 : ref11.uuid)) {
                            var ref12, ref13, ref14, ref15, ref16, ref17;
                            socket.emit('private-chat-message', {
                                content: ((ref12 = loggedInUser.user) === null || ref12 === void 0 ? void 0 : (ref13 = ref12.profile) === null || ref13 === void 0 ? void 0 : ref13.username) + ' sent you a message.',
                                from: (ref14 = loggedInUser.user) === null || ref14 === void 0 ? void 0 : (ref15 = ref14.profile) === null || ref15 === void 0 ? void 0 : ref15.uuid,
                                fromUsername: (ref16 = loggedInUser.user) === null || ref16 === void 0 ? void 0 : (ref17 = ref16.profile) === null || ref17 === void 0 ? void 0 : ref17.username,
                                to: conversationProfile.uuid,
                                toUsername: conversationProfile.username,
                                messageUuid: response.data.uuid,
                                message: response.data.content,
                                type: response.data.type,
                                src: response.data.src,
                                conversationUuid: activeConversation.uuid
                            });
                        }
                    });
                }
                dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_9__/* .addMessageToActiveConversation */ .Yn)({
                    uuid: response.data.uuid,
                    message: response.data.content,
                    from: 'me',
                    type: response.data.type,
                    src: response.data.src,
                    conversationUuid: activeConversation.uuid,
                    deleted: false,
                    sender: {
                        uuid: loggedInUser === null || loggedInUser === void 0 ? void 0 : (ref20 = loggedInUser.user) === null || ref20 === void 0 ? void 0 : (ref2 = ref20.profile) === null || ref2 === void 0 ? void 0 : ref2.uuid,
                        username: loggedInUser === null || loggedInUser === void 0 ? void 0 : (ref3 = loggedInUser.user) === null || ref3 === void 0 ? void 0 : (ref4 = ref3.profile) === null || ref4 === void 0 ? void 0 : ref4.username
                    }
                }));
            }).catch((error)=>{
                console.log('error:', error);
            });
        }
    }, [
        acceptedFiles
    ]);
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        ...getRootProps({
            className: 'dropzone'
        }),
        children: children
    }));
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4412:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ noon_Footer)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "@chakra-ui/react"
var react_ = __webpack_require__(8930);
// EXTERNAL MODULE: external "@chakra-ui/icons"
var icons_ = __webpack_require__(4513);
// EXTERNAL MODULE: ./src/store/chat.js + 1 modules
var chat = __webpack_require__(7917);
// EXTERNAL MODULE: ./src/store/video.js
var video = __webpack_require__(4912);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: ./src/store/users.js
var users = __webpack_require__(5565);
// EXTERNAL MODULE: ./src/store/sockets.js
var sockets = __webpack_require__(6135);
// EXTERNAL MODULE: ./src/generated/graphql.tsx
var graphql = __webpack_require__(9402);
;// CONCATENATED MODULE: ./src/utils/formatTime.ts
function formatMinutes(minutes) {
    return minutes < 10 ? `0${minutes}` : `${minutes}`;
}
function formatSeconds(seconds) {
    return seconds < 10 ? `0${seconds}` : `${seconds}`;
}

;// CONCATENATED MODULE: external "react-icons/im"
const im_namespaceObject = require("react-icons/im");
;// CONCATENATED MODULE: ./src/components/AudioRecorder/recorder-controls/index.tsx




function RecorderControls({ recorderState , handlers  }) {
    const { recordingMinutes , recordingSeconds , initRecording  } = recorderState;
    const { startRecording , saveRecording , cancelRecording  } = handlers;
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Flex, {
        className: "items-center mx-2 bg-blue-300 rounded px-2 relative z-20",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(react_.Flex, {
                className: "items-center py-0",
                children: initRecording && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Flex, {
                    className: "",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(react_.Flex, {
                            className: "",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                className: "mb-1 p-2 cursor-pointer hover:text-red-500",
                                title: "Cancel recording",
                                onClick: cancelRecording,
                                children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Icon, {
                                    as: im_namespaceObject.ImCancelCircle
                                })
                            })
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Flex, {
                            className: "mx-2 items-center text-lg bg-green-300 rounded p-1 px-2",
                            children: [
                                initRecording && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "recording-indicator"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    children: formatMinutes(recordingMinutes)
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    children: ":"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    children: formatSeconds(recordingSeconds)
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(react_.Flex, {
                className: "items-center",
                children: initRecording ? /*#__PURE__*/ jsx_runtime_.jsx("button", {
                    className: "mb-1 text-green-600",
                    title: "Save recording",
                    disabled: recordingSeconds === 0,
                    onClick: saveRecording,
                    children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Icon, {
                        as: im_namespaceObject.ImArrowRight
                    })
                }) : /*#__PURE__*/ jsx_runtime_.jsx("button", {
                    className: "mb-1 mx-2",
                    title: "Start recording",
                    onClick: startRecording,
                    children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Icon, {
                        as: im_namespaceObject.ImMic
                    })
                })
            })
        ]
    }));
};

;// CONCATENATED MODULE: ./src/components/AudioRecorder/handlers/recorder-controls.ts
async function startRecording(setRecorderState) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true
        });
        setRecorderState((prevState)=>{
            return {
                ...prevState,
                initRecording: true,
                mediaStream: stream
            };
        });
    } catch (err) {
        console.log(err);
    }
}
function saveRecording(recorder) {
    if (recorder.state !== 'inactive') {
        console.log('recorder state:', JSON.stringify(recorder));
        recorder.stop();
    }
}

// EXTERNAL MODULE: external "form-data"
var external_form_data_ = __webpack_require__(8941);
var external_form_data_default = /*#__PURE__*/__webpack_require__.n(external_form_data_);
// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(2167);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);
;// CONCATENATED MODULE: ./src/components/AudioRecorder/hooks/use-recorder.ts








const initialState = {
    recordingMinutes: 0,
    recordingSeconds: 0,
    initRecording: false,
    mediaStream: null,
    mediaRecorder: null,
    audio: null
};
function useRecorder() {
    const { 0: recorderState , 1: setRecorderState  } = (0,external_react_.useState)(initialState);
    // const [recordings, setRecordings] = useState<Audio[]>([])
    const dispatch = (0,external_react_redux_.useDispatch)();
    const socket = (0,external_react_redux_.useSelector)(sockets/* getSocket */.hb);
    const activeConversation = (0,external_react_redux_.useSelector)(chat/* getActiveConversation */.tI);
    const loggedInUser = (0,external_react_redux_.useSelector)(users/* getLoggedInUser */.r);
    const activeConversee = (0,external_react_redux_.useSelector)(chat/* getActiveConversee */.PY);
    (0,external_react_.useEffect)(()=>{
        const MAX_RECORDER_TIME = 5;
        let recordingInterval = null;
        if (recorderState.initRecording) recordingInterval = setInterval(()=>{
            setRecorderState((prevState)=>{
                if (prevState.recordingMinutes === MAX_RECORDER_TIME && prevState.recordingSeconds === 0) {
                    typeof recordingInterval === 'number' && clearInterval(recordingInterval);
                    return prevState;
                }
                if (prevState.recordingSeconds >= 0 && prevState.recordingSeconds < 59) return {
                    ...prevState,
                    recordingSeconds: prevState.recordingSeconds + 1
                };
                else if (prevState.recordingSeconds === 59) return {
                    ...prevState,
                    recordingMinutes: prevState.recordingMinutes + 1,
                    recordingSeconds: 0
                };
                else return prevState;
            });
        }, 1000);
        else typeof recordingInterval === 'number' && clearInterval(recordingInterval);
        return ()=>{
            typeof recordingInterval === 'number' && clearInterval(recordingInterval);
        };
    });
    (0,external_react_.useEffect)(()=>{
        setRecorderState((prevState)=>{
            if (prevState.mediaStream) return {
                ...prevState,
                mediaRecorder: new MediaRecorder(prevState.mediaStream)
            };
            else return prevState;
        });
    }, [
        recorderState.mediaStream
    ]);
    (0,external_react_.useEffect)(()=>{
        const recorder = recorderState.mediaRecorder;
        let chunks = [];
        if (recorder && recorder.state === 'inactive') {
            recorder.start();
            recorder.ondataavailable = (e)=>{
                chunks.push(e.data);
            };
            recorder.onstop = async ()=>{
                var ref18, ref1;
                const blob = new Blob(chunks, {
                    type: 'audio/ogg; codecs=opus'
                });
                chunks = [];
                const formData = new (external_form_data_default())();
                formData.append('file', blob, 'file');
                formData.append('conversationUuid', activeConversation.uuid);
                formData.append('senderUuid', (ref18 = loggedInUser.user) === null || ref18 === void 0 ? void 0 : (ref1 = ref18.profile) === null || ref1 === void 0 ? void 0 : ref1.uuid);
                if (recorder.stream.active) {
                    await external_axios_default().post('http://localhost:4020/media_api/upload_audio_recording', formData, {
                        headers: {
                            accept: 'application/json',
                            'Accept-Language': 'en-US,en;q=0.8',
                            'Content-Type': `multipart/form-data;`
                        }
                    }).then(async (response)=>{
                        var ref19, ref2, ref3, ref4;
                        if (activeConversation.type === 'pm') {
                            var ref5, ref6, ref7, ref8, ref9, ref10;
                            socket.emit('private-chat-message', {
                                content: ((ref5 = loggedInUser.user) === null || ref5 === void 0 ? void 0 : (ref6 = ref5.profile) === null || ref6 === void 0 ? void 0 : ref6.username) + ' sent you a message.',
                                from: (ref7 = loggedInUser.user) === null || ref7 === void 0 ? void 0 : (ref8 = ref7.profile) === null || ref8 === void 0 ? void 0 : ref8.uuid,
                                fromUsername: (ref9 = loggedInUser.user) === null || ref9 === void 0 ? void 0 : (ref10 = ref9.profile) === null || ref10 === void 0 ? void 0 : ref10.username,
                                to: activeConversee.uuid,
                                toUsername: activeConversee.username,
                                messageUuid: response.data.content,
                                message: response.data.content,
                                type: response.data.type,
                                src: response.data.src,
                                conversationUuid: activeConversation.uuid
                            });
                        } else {
                            activeConversation.profiles.map((profile)=>{
                                var ref, ref11;
                                if (profile.uuid !== ((ref = loggedInUser.user) === null || ref === void 0 ? void 0 : (ref11 = ref.profile) === null || ref11 === void 0 ? void 0 : ref11.uuid)) {
                                    var ref12, ref13, ref14, ref15, ref16, ref17;
                                    socket.emit('private-chat-message', {
                                        content: ((ref12 = loggedInUser.user) === null || ref12 === void 0 ? void 0 : (ref13 = ref12.profile) === null || ref13 === void 0 ? void 0 : ref13.username) + ' sent you a message.',
                                        from: (ref14 = loggedInUser.user) === null || ref14 === void 0 ? void 0 : (ref15 = ref14.profile) === null || ref15 === void 0 ? void 0 : ref15.uuid,
                                        fromUsername: (ref16 = loggedInUser.user) === null || ref16 === void 0 ? void 0 : (ref17 = ref16.profile) === null || ref17 === void 0 ? void 0 : ref17.username,
                                        to: profile.uuid,
                                        toUsername: profile.username,
                                        messageUuid: response.data.uuid,
                                        message: response.data.content,
                                        type: response.data.type,
                                        src: response.data.src,
                                        conversationUuid: activeConversation.uuid
                                    });
                                }
                            });
                        }
                        dispatch((0,chat/* addMessageToActiveConversation */.Yn)({
                            uuid: response.data.uuid,
                            message: response.data.content,
                            sender: {
                                uuid: loggedInUser === null || loggedInUser === void 0 ? void 0 : (ref19 = loggedInUser.user) === null || ref19 === void 0 ? void 0 : (ref2 = ref19.profile) === null || ref2 === void 0 ? void 0 : ref2.uuid,
                                username: loggedInUser === null || loggedInUser === void 0 ? void 0 : (ref3 = loggedInUser.user) === null || ref3 === void 0 ? void 0 : (ref4 = ref3.profile) === null || ref4 === void 0 ? void 0 : ref4.username
                            },
                            from: 'me',
                            type: response.data.type,
                            src: response.data.src,
                            deleted: false,
                            conversationUuid: activeConversation.uuid
                        }));
                    }).catch((error)=>{
                        //handle error
                        console.log("error on record:", error);
                    }).finally();
                }
                setRecorderState((prevState)=>{
                    if (prevState.mediaRecorder) {
                        return {
                            ...initialState,
                            audio: window.URL.createObjectURL(blob)
                        };
                    } else {
                        return initialState;
                    }
                });
            };
        }
        return ()=>{
            console.log('recorder on exit:', recorder);
            if (recorder) recorder.stream.getAudioTracks().forEach((track)=>track.stop()
            );
        // window.URL.createObjectURL()
        };
    }, [
        recorderState.mediaRecorder
    ]);
    return {
        recorderState,
        startRecording: ()=>startRecording(setRecorderState)
        ,
        cancelRecording: ()=>setRecorderState(initialState)
        ,
        saveRecording: ()=>saveRecording(recorderState.mediaRecorder)
    };
};

;// CONCATENATED MODULE: ./src/pages/noon/Footer.tsx












const Footer = ({ inputMessage , setInputMessage , handleSendMessage  })=>{
    const dispatch = (0,external_react_redux_.useDispatch)();
    const socket = (0,external_react_redux_.useSelector)(sockets/* getSocket */.hb);
    const activeConversation = (0,external_react_redux_.useSelector)(chat/* getActiveConversation */.tI);
    const loggedInUser = (0,external_react_redux_.useSelector)(users/* getLoggedInUser */.r);
    const activeConversee = (0,external_react_redux_.useSelector)(chat/* getActiveConversee */.PY);
    const [, setPendingCallForConversation] = (0,graphql/* useSetPendingCallForConversationMutation */.xD)();
    const { recorderState , ...handlers } = useRecorder();
    (0,external_react_.useEffect)(()=>{
        if (socket) {
            socket.on('set-ongoing-call-for-conversation', ({ from , fromUsername  })=>{
                dispatch((0,chat/* setOngoingCall */.lT)({
                    uuid: activeConversation.uuid,
                    initiator: {
                        uuid: from,
                        username: fromUsername
                    }
                }));
            });
            socket.on('message-deleted', ({ messageUuid , conversationUuid ,  })=>{
                dispatch((0,chat/* deleteMessageInStore */.HT)({
                    uuid: messageUuid,
                    content: 'Message has been deleted.',
                    deleted: true,
                    conversationUuid: conversationUuid
                }));
            });
        }
        return ()=>{
            if (socket) socket.off('set-ongoing-call-for-conversation');
        };
    }, [
        activeConversee
    ]);
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Flex, {
        className: "bg-white items-center box-content h-full justify-between",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(react_.Box, {
                className: "w-4/6 relative z-10",
                children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Input, {
                    className: "py-2 box-content text-black",
                    placeholder: "Type message...",
                    border: "none",
                    borderRadius: "none",
                    outline: 0,
                    onKeyPress: (e)=>{
                        if (e.key === 'Enter') {
                            handleSendMessage();
                        }
                    },
                    value: inputMessage,
                    onChange: (e)=>setInputMessage(e.target.value)
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Flex, {
                className: "w-2/6 justify-end",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(RecorderControls, {
                        recorderState: recorderState,
                        handlers: handlers
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(react_.Button, {
                        className: "mr-2",
                        bg: "green.500",
                        title: "Start call",
                        _hover: {
                            bg: 'black',
                            color: 'black',
                            border: '1px solid black'
                        },
                        onClick: async ()=>{
                            dispatch((0,video/* setVideoFrameForConversation */.Iw)(true));
                            activeConversation.profiles.map(async (profile)=>{
                                var ref, ref1, ref2, ref3;
                                socket.emit('set-pending-call-for-conversation', {
                                    from: (ref = loggedInUser.user) === null || ref === void 0 ? void 0 : (ref1 = ref.profile) === null || ref1 === void 0 ? void 0 : ref1.uuid,
                                    fromUsername: (ref2 = loggedInUser.user) === null || ref2 === void 0 ? void 0 : (ref3 = ref2.profile) === null || ref3 === void 0 ? void 0 : ref3.username,
                                    to: profile.uuid,
                                    toUsername: profile.username,
                                    conversationUuid: activeConversation.uuid
                                });
                                await setPendingCallForConversation({
                                    conversationUuid: activeConversation.uuid,
                                    profileUuid: profile.uuid
                                });
                            });
                        },
                        children: /*#__PURE__*/ jsx_runtime_.jsx(icons_.PhoneIcon, {
                            className: "",
                            color: "white"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(react_.Button, {
                        bg: "black",
                        color: "white",
                        title: "Send message",
                        className: "mr-3",
                        _hover: {
                            bg: 'white',
                            color: 'black',
                            border: '1px solid black'
                        },
                        disabled: inputMessage.trim().length <= 0,
                        onClick: handleSendMessage,
                        children: "Send"
                    })
                ]
            })
        ]
    }));
};
/* harmony default export */ const noon_Footer = (Footer);


/***/ }),

/***/ 8706:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8930);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store_chat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7917);
/* harmony import */ var _store_users__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5565);
/* harmony import */ var _store_sockets__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6135);
/* harmony import */ var _generated_graphql__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9402);
/* harmony import */ var _store_video__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4912);









const Header = ()=>{
    const activeConversee = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)(_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .getActiveConversee */ .PY);
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useDispatch)();
    const loggedInUser = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)(_store_users__WEBPACK_IMPORTED_MODULE_5__/* .getLoggedInUser */ .r);
    const socket = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)(_store_sockets__WEBPACK_IMPORTED_MODULE_6__/* .getSocket */ .hb);
    const { 0: online , 1: setOnline  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('loading');
    const activeConversation = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)(_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .getActiveConversation */ .tI);
    const [, cancelPendingCallForConversation] = (0,_generated_graphql__WEBPACK_IMPORTED_MODULE_7__/* .useCancelPendingCallForConversationMutation */ .Fg)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (activeConversee) {
            var ref, ref1, ref2, ref3;
            socket.emit('check-friend-connection', {
                from: (ref = loggedInUser.user) === null || ref === void 0 ? void 0 : (ref1 = ref.profile) === null || ref1 === void 0 ? void 0 : ref1.uuid,
                fromUsername: (ref2 = loggedInUser.user) === null || ref2 === void 0 ? void 0 : (ref3 = ref2.profile) === null || ref3 === void 0 ? void 0 : ref3.username,
                to: activeConversee.uuid,
                toUsername: activeConversee.username
            });
            socket.on('check-friend-connection', ({ session  })=>{
                if (session.connected === true) {
                    setOnline('true');
                }
            });
            socket.on('friend-connected', ({ uuid  })=>{
                console.log('friend connected:', uuid);
                if (uuid === activeConversee.uuid) {
                    setOnline('true');
                }
            });
            socket.on('friend-disconnected', ({ uuid  })=>{
                if (uuid === activeConversee.uuid) {
                    setOnline('false');
                }
            });
        }
        return ()=>{
            setOnline('loading');
            socket.off('check-friend-connection');
            socket.off('friend-connected');
            socket.off('friend-disconnected');
        };
    }, [
        activeConversee
    ]);
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
        w: "100%",
        className: "items-center justify-between",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
                className: "items-center px-3",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Avatar, {
                        size: "md",
                        name: activeConversation.type === 'pm' ? activeConversee.username : activeConversation.name,
                        children: activeConversation.type === 'pm' ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.AvatarBadge, {
                            boxSize: "1.25em",
                            bg: online !== 'true' ? 'yellow.500' : 'green.500'
                        }) : null
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
                        flexDirection: "column",
                        mx: "3",
                        my: "5",
                        justify: "center",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, {
                                fontSize: "lg",
                                fontWeight: "bold",
                                children: activeConversation.type === 'pm' ? activeConversee.username : activeConversation.name
                            }),
                            activeConversation.type === 'pm' ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, {
                                color: "green.500",
                                fontSize: "sm",
                                children: online === 'true' ? 'Online' : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: "opacity-0",
                                    children: "f"
                                })
                            }) : null
                        ]
                    }),
                    activeConversation.type === 'group' ? activeConversation.profiles.map((item, index)=>{
                        return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, {
                            className: "mr-2",
                            children: [
                                item.username,
                                ","
                            ]
                        }, index));
                    }) : null
                ]
            }),
            (activeConversation === null || activeConversation === void 0 ? void 0 : activeConversation.pendingCall) ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
                className: "h-full py-4 flex-col justify-end items-end w-1/2",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
                    className: "flex justify-end px-4 py-2 items-center",
                    bg: "blue.500",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, {
                            className: "mb-2 mr-3 mt-1 font-black",
                            children: "Call ongoing"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Button, {
                            bg: "red.500",
                            className: "mr-2",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Heading, {
                                fontSize: "md",
                                onClick: async ()=>{
                                    var ref10, ref4, ref5, ref6;
                                    dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .cancelPendingCall */ .zz)({
                                        conversationUuid: activeConversation.uuid,
                                        loggedInProfileUuid: (ref10 = loggedInUser.user) === null || ref10 === void 0 ? void 0 : (ref4 = ref10.profile) === null || ref4 === void 0 ? void 0 : ref4.uuid
                                    }));
                                    await cancelPendingCallForConversation({
                                        conversationUuid: activeConversation.uuid,
                                        profileUuid: (ref5 = loggedInUser.user) === null || ref5 === void 0 ? void 0 : (ref6 = ref5.profile) === null || ref6 === void 0 ? void 0 : ref6.uuid
                                    });
                                    activeConversation.calls.map((call)=>{
                                        var ref, ref7, ref8, ref9;
                                        socket.emit('cancel-pending-call-for-conversation', {
                                            from: (ref = loggedInUser.user) === null || ref === void 0 ? void 0 : (ref7 = ref.profile) === null || ref7 === void 0 ? void 0 : ref7.uuid,
                                            fromUsername: (ref8 = loggedInUser.user) === null || ref8 === void 0 ? void 0 : (ref9 = ref8.profile) === null || ref9 === void 0 ? void 0 : ref9.username,
                                            to: call.profileUuid,
                                            toUsername: call.profileUsername,
                                            conversationUuid: activeConversation.uuid
                                        });
                                    });
                                },
                                children: "Cancel"
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Button, {
                            bg: "green.500",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Heading, {
                                fontSize: "md",
                                onClick: async ()=>{
                                    var ref, ref11;
                                    dispatch((0,_store_video__WEBPACK_IMPORTED_MODULE_8__/* .setVideoFrameForConversation */ .Iw)(true));
                                    dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_4__/* .setPendingCall */ .gu)({
                                        profileUuid: (ref = loggedInUser.user) === null || ref === void 0 ? void 0 : (ref11 = ref.profile) === null || ref11 === void 0 ? void 0 : ref11.uuid,
                                        from: 'fewfewf',
                                        fromJoin: true,
                                        pendingCall: false,
                                        ongoingCall: false,
                                        conversationUuid: activeConversation.uuid
                                    }));
                                },
                                children: "Join"
                            })
                        })
                    ]
                })
            }) : null
        ]
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);


/***/ }),

/***/ 4876:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ noon_Messages)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "@chakra-ui/react"
var react_ = __webpack_require__(8930);
// EXTERNAL MODULE: external "@chakra-ui/icons"
var icons_ = __webpack_require__(4513);
// EXTERNAL MODULE: ./src/generated/graphql.tsx
var graphql = __webpack_require__(9402);
// EXTERNAL MODULE: ./src/store/chat.js + 1 modules
var chat = __webpack_require__(7917);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: ./src/store/users.js
var users = __webpack_require__(5565);
;// CONCATENATED MODULE: external "react-audio-player"
const external_react_audio_player_namespaceObject = require("react-audio-player");
var external_react_audio_player_default = /*#__PURE__*/__webpack_require__.n(external_react_audio_player_namespaceObject);
;// CONCATENATED MODULE: external "react-infinite-scroll-component"
const external_react_infinite_scroll_component_namespaceObject = require("react-infinite-scroll-component");
var external_react_infinite_scroll_component_default = /*#__PURE__*/__webpack_require__.n(external_react_infinite_scroll_component_namespaceObject);
// EXTERNAL MODULE: ./src/store/sockets.js
var sockets = __webpack_require__(6135);
;// CONCATENATED MODULE: ./src/pages/noon/Messages.tsx











const Messages = ()=>{
    const dispatch = (0,external_react_redux_.useDispatch)();
    const loggedInUser = (0,external_react_redux_.useSelector)(users/* getLoggedInUser */.r);
    const activeConversation = (0,external_react_redux_.useSelector)(chat/* getActiveConversation */.tI);
    const activeConversee = (0,external_react_redux_.useSelector)(chat/* getActiveConversee */.PY);
    const shouldPauseCheckHasMore = (0,external_react_redux_.useSelector)(chat/* getShouldPauseCheckHasMore */.g);
    const socket = (0,external_react_redux_.useSelector)(sockets/* getSocket */.hb);
    const [, clearUnreadMessagesForConversation] = (0,graphql/* useClearUnreadMessagesForConversationMutation */.N3)();
    const [, deleteMessage] = (0,graphql/* useDeleteMessageMutation */.h$)();
    const { 0: variables , 1: setVariables  } = (0,external_react_.useState)({
        limit: 20,
        cursor: activeConversation.messages.length !== 0 ? activeConversation.messages[activeConversation.messages.length - 1].createdAt : null,
        conversationUuid: activeConversation.uuid
    });
    const { 0: shouldPause , 1: setShouldPause  } = (0,external_react_.useState)(true);
    const { 1: setShouldCheckHasMorePause  } = (0,external_react_.useState)(false);
    const { 0: localMessages1 , 1: setLocalMessages  } = (0,external_react_.useState)([]);
    const [{ data  }] = (0,graphql/* useGetMessagesForConversationQuery */.VO)({
        variables,
        pause: shouldPause,
        requestPolicy: 'network-only'
    });
    let [{ data: hasMoreOnInit  }] = (0,graphql/* useCheckIfConversationHasMoreMessagesQuery */.jE)({
        variables: {
            conversationUuid: activeConversation.uuid
        },
        pause: shouldPauseCheckHasMore,
        requestPolicy: 'network-only'
    });
    (0,external_react_.useEffect)(()=>{
        console.log('hasmore on init:', hasMoreOnInit === null || hasMoreOnInit === void 0 ? void 0 : hasMoreOnInit.checkIfConversationHasMoreMessages);
        if (hasMoreOnInit === null || hasMoreOnInit === void 0 ? void 0 : hasMoreOnInit.checkIfConversationHasMoreMessages) {
            dispatch((0,chat/* setActiveConversationHasMoreMessages */.PQ)(hasMoreOnInit === null || hasMoreOnInit === void 0 ? void 0 : hasMoreOnInit.checkIfConversationHasMoreMessages));
        }
        return ()=>{
            setShouldCheckHasMorePause(false);
            setLocalMessages([]);
        };
    }, [
        hasMoreOnInit === null || hasMoreOnInit === void 0 ? void 0 : hasMoreOnInit.checkIfConversationHasMoreMessages
    ]);
    (0,external_react_.useEffect)(()=>{
        if (data) {
            setShouldCheckHasMorePause(true);
            dispatch((0,chat/* setShouldPauseCheckHasMore */.J0)(true));
            hasMoreOnInit = undefined;
            setLocalMessages((localMessages)=>[
                    ...localMessages
                ]
            );
        // updateMyArray( arr => [...arr, `${arr.length}`]);
        }
        return ()=>{
            setShouldCheckHasMorePause(false);
            setLocalMessages([]);
        };
    }, [
        data
    ]);
    // TODO check how to initialize data
    (0,external_react_.useEffect)(()=>{
        if (localMessages1.length !== 0) {
            dispatch((0,chat/* addMessagesToConversation */.eJ)({
                conversationUuid: activeConversation.uuid,
                messages: localMessages1,
                loggedInUser
            }));
        } else {}
    }, [
        localMessages1
    ]);
    (0,external_react_.useEffect)(()=>{
        if (activeConversation.unreadMessages && activeConversation.unreadMessages !== 0 && activeConversation.profileThatHasUnreadMessages === loggedInUser.user.profile.uuid) {
            clearUnreadMessagesForConversation({
                conversationUuid: activeConversation.uuid,
                profileUuid: 'fejfnewjnfewjf'
            });
            dispatch(chat/* clearUnreadMessagesForConversationInStore */.Wj);
        }
        return ()=>{
        // dispatch(setActiveConversationSet(false))
        // dispatch(setActiveConversee(null))
        // dispatch(setActiveConversation(null))
        // setVariables({
        //   conversationUuid: null,
        //   limit: variables.limit,
        //   cursor: null,
        // })
        };
    }, []);
    const fetchMoreMessage = ()=>{
        setTimeout(()=>{
            setVariables({
                conversationUuid: activeConversation.uuid,
                limit: variables.limit,
                cursor: activeConversation.messages[activeConversation.messages.length - 1].createdAt
            });
            setShouldPause(false);
        }, 750);
    };
    const deleteMessageHandler = async (item)=>{
        var ref6, ref1, ref2;
        const message = await deleteMessage({
            messageUuid: item.uuid,
            conversationUuid: activeConversation.uuid,
            from: loggedInUser.user.profile.uuid,
            type: item.type,
            src: item.src
        });
        console.log('message in update message1:', message);
        dispatch((0,chat/* deleteMessageInStore */.HT)({
            uuid: (ref6 = message.data) === null || ref6 === void 0 ? void 0 : ref6.deleteMessage.uuid,
            content: (ref1 = message.data) === null || ref1 === void 0 ? void 0 : ref1.deleteMessage.content,
            deleted: (ref2 = message.data) === null || ref2 === void 0 ? void 0 : ref2.deleteMessage.deleted,
            conversationUuid: activeConversation.uuid
        }));
        activeConversation.profiles.map((profile)=>{
            var ref, ref3;
            if (profile.uuid !== ((ref = loggedInUser.user) === null || ref === void 0 ? void 0 : (ref3 = ref.profile) === null || ref3 === void 0 ? void 0 : ref3.uuid)) {
                var ref4, ref5;
                socket.emit('message-deleted', {
                    messageUuid: item.uuid,
                    to: profile.uuid,
                    toUsername: profile.username,
                    fromUsername: (ref4 = loggedInUser.user) === null || ref4 === void 0 ? void 0 : (ref5 = ref4.profile) === null || ref5 === void 0 ? void 0 : ref5.username,
                    from: loggedInUser.user.profile.uuid,
                    conversationUuid: activeConversation.uuid
                });
            }
        });
    };
    return(/*#__PURE__*/ jsx_runtime_.jsx(react_.Flex, {
        id: "scrollableDiv",
        overflowY: "auto",
        flexDirection: "column-reverse",
        className: "w-full top-0 py-3 px-5 relative",
        style: {
            height: '80vh'
        },
        children: /*#__PURE__*/ jsx_runtime_.jsx((external_react_infinite_scroll_component_default()), {
            dataLength: activeConversation.messages,
            next: fetchMoreMessage,
            style: {
                display: 'flex',
                flexDirection: 'column-reverse'
            },
            inverse: true,
            hasMore: !shouldPauseCheckHasMore ? !!(hasMoreOnInit === null || hasMoreOnInit === void 0 ? void 0 : hasMoreOnInit.checkIfConversationHasMoreMessages) : !!(data === null || data === void 0 ? void 0 : data.getMessagesForConversation) ? !!(data === null || data === void 0 ? void 0 : data.getMessagesForConversation.hasMore) : true,
            loader: /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                className: "m-auto text-xl py-5 top-0 left-1/2",
                children: "Loading..."
            }),
            scrollableTarget: "scrollableDiv",
            children: activeConversation && activeConversation.type === 'pm' ? activeConversation.messages.map((item, index)=>{
                if (item.from === 'me') {
                    return(/*#__PURE__*/ jsx_runtime_.jsx(react_.Flex, {
                        w: "100%",
                        justify: "flex-end",
                        children: item.type === 'text' ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Flex, {
                            bg: "black",
                            color: "white",
                            minW: "100px",
                            maxW: "350px",
                            my: "1",
                            pr: !item.deleted ? '0' : '3',
                            pl: "3",
                            py: "2",
                            className: "relative",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(react_.Text, {
                                    className: "",
                                    children: !item.deleted ? item.content : /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                        className: "text-gray-400",
                                        children: item.content
                                    })
                                }),
                                !item.deleted ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Menu, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(react_.MenuButton, {
                                            className: "",
                                            boxSize: "1rem",
                                            as: react_.IconButton,
                                            "aria-label": "Options",
                                            icon: /*#__PURE__*/ jsx_runtime_.jsx(icons_.ChevronDownIcon, {}),
                                            variant: "none",
                                            mr: "0",
                                            ml: "0",
                                            pr: "0",
                                            pl: "0",
                                            px: 0,
                                            py: 0,
                                            mx: 0,
                                            my: 0
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(react_.Portal, {
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(react_.MenuList, {
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(react_.MenuItem, {
                                                    className: "text-white",
                                                    color: "white",
                                                    onClick: async ()=>{
                                                        await deleteMessageHandler(item);
                                                    },
                                                    children: "Unsend message"
                                                })
                                            })
                                        })
                                    ]
                                }) : null
                            ]
                        }) : item.type === 'image' ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Flex, {
                            className: "justify-end relative",
                            boxSize: !item.deleted ? 'sm' : '',
                            bg: !item.deleted ? '' : 'black',
                            minW: !item.deleted ? '100px' : '',
                            maxW: !item.deleted ? '350px' : '',
                            my: "1",
                            p: !item.deleted ? '0' : '3',
                            children: [
                                !item.deleted ? /*#__PURE__*/ jsx_runtime_.jsx(react_.Image, {
                                    src: item.src,
                                    alt: item.content
                                }) : /*#__PURE__*/ jsx_runtime_.jsx(react_.Text, {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                        children: item.content
                                    })
                                }),
                                !item.deleted ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "absolute rounded border-black",
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Menu, {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(react_.MenuButton, {
                                                as: react_.IconButton,
                                                "aria-label": "Options",
                                                icon: /*#__PURE__*/ jsx_runtime_.jsx(icons_.ChevronDownIcon, {}),
                                                variant: "none",
                                                px: 0,
                                                py: 0,
                                                mx: 0,
                                                my: 0
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(react_.MenuList, {
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(react_.MenuItem, {
                                                    onClick: async ()=>{
                                                        await deleteMessageHandler(item);
                                                    },
                                                    children: "Unsend message"
                                                })
                                            })
                                        ]
                                    })
                                }) : null
                            ]
                        }) : item.type === 'audio' ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Flex, {
                            className: "justify-end relative",
                            boxSize: !item.deleted ? '' : '',
                            bg: !item.deleted ? 'black' : 'black',
                            minW: !item.deleted ? '100px' : '',
                            maxW: !item.deleted ? '350px' : '',
                            my: "1",
                            p: !item.deleted ? '0' : '3',
                            children: [
                                !item.deleted ? /*#__PURE__*/ jsx_runtime_.jsx((external_react_audio_player_default()), {
                                    src: item.src,
                                    controls: true
                                }) : /*#__PURE__*/ jsx_runtime_.jsx(react_.Text, {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                        children: item.content
                                    })
                                }),
                                !item.deleted ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Menu, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(react_.MenuButton, {
                                            as: react_.IconButton,
                                            "aria-label": "Options",
                                            icon: /*#__PURE__*/ jsx_runtime_.jsx(icons_.ChevronDownIcon, {}),
                                            variant: "none",
                                            px: 0,
                                            py: 0,
                                            mx: 0,
                                            my: 0
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(react_.MenuList, {
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(react_.MenuItem, {
                                                onClick: async ()=>{
                                                    await deleteMessageHandler(item);
                                                },
                                                children: "Unsend message"
                                            })
                                        })
                                    ]
                                }) : null
                            ]
                        }) : null
                    }, index));
                } else {
                    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Flex, {
                        className: "items-start",
                        w: "100%",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(react_.Avatar, {
                                size: "sm",
                                name: activeConversee.username,
                                className: "mr-2"
                            }),
                            item.type === 'text' ? /*#__PURE__*/ jsx_runtime_.jsx(react_.Flex, {
                                bg: "gray.100",
                                color: "black",
                                minW: "100px",
                                maxW: "350px",
                                my: "1",
                                p: "3",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Text, {
                                    children: !item.deleted ? item.content : /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                        children: item.content
                                    })
                                })
                            }) : item.type === 'image' ? /*#__PURE__*/ jsx_runtime_.jsx(react_.Flex, {
                                className: "justify-end relative",
                                boxSize: !item.deleted ? 'sm' : '',
                                bg: !item.deleted ? '' : 'black',
                                minW: !item.deleted ? '100px' : '',
                                maxW: !item.deleted ? '350px' : '',
                                my: "1",
                                p: !item.deleted ? '0' : '3',
                                children: !item.deleted ? /*#__PURE__*/ jsx_runtime_.jsx(react_.Image, {
                                    src: item.src,
                                    alt: item.content
                                }) : /*#__PURE__*/ jsx_runtime_.jsx(react_.Text, {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                        children: item.content
                                    })
                                })
                            }) : item.type === 'audio' ? /*#__PURE__*/ jsx_runtime_.jsx(react_.Flex, {
                                className: "justify-end relative",
                                boxSize: !item.deleted ? '' : '',
                                bg: !item.deleted ? 'black' : 'black',
                                minW: !item.deleted ? '100px' : '',
                                maxW: !item.deleted ? '350px' : '',
                                my: "1",
                                p: !item.deleted ? '0' : '3',
                                children: !item.deleted ? /*#__PURE__*/ jsx_runtime_.jsx((external_react_audio_player_default()), {
                                    src: item.src,
                                    controls: true
                                }) : /*#__PURE__*/ jsx_runtime_.jsx(react_.Text, {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                        children: item.content
                                    })
                                })
                            }) : null
                        ]
                    }, index));
                }
            }) : activeConversation && activeConversation.type === 'group' ? activeConversation.messages.map((item, index)=>{
                if (item.from === 'me') {
                    return(/*#__PURE__*/ jsx_runtime_.jsx(react_.Flex, {
                        w: "100%",
                        justify: "flex-end",
                        children: item.type === 'text' ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Flex, {
                            bg: "black",
                            color: "white",
                            minW: "100px",
                            maxW: "350px",
                            my: "1",
                            p: "3",
                            className: "relative",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(react_.Text, {
                                    children: !item.deleted ? item.content : /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                        children: item.content
                                    })
                                }),
                                !item.deleted ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Menu, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(react_.MenuButton, {
                                            as: react_.IconButton,
                                            "aria-label": "Options",
                                            icon: /*#__PURE__*/ jsx_runtime_.jsx(icons_.ChevronDownIcon, {}),
                                            variant: "none",
                                            px: 0,
                                            py: 0,
                                            mx: 0,
                                            my: 0
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(react_.MenuList, {
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(react_.MenuItem, {
                                                onClick: async ()=>{
                                                    await deleteMessageHandler(item);
                                                },
                                                children: "Unsend message"
                                            })
                                        })
                                    ]
                                }) : null
                            ]
                        }) : item.type === 'image' ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Flex, {
                            className: "justify-end relative",
                            boxSize: !item.deleted ? 'sm' : '',
                            bg: !item.deleted ? '' : 'black',
                            minW: !item.deleted ? '100px' : '',
                            maxW: !item.deleted ? '350px' : '',
                            my: "1",
                            p: !item.deleted ? '0' : '3',
                            children: [
                                !item.deleted ? /*#__PURE__*/ jsx_runtime_.jsx(react_.Image, {
                                    src: item.src,
                                    alt: item.content
                                }) : /*#__PURE__*/ jsx_runtime_.jsx(react_.Text, {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                        children: item.content
                                    })
                                }),
                                !item.deleted ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "absolute rounded border-black",
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Menu, {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(react_.MenuButton, {
                                                as: react_.IconButton,
                                                "aria-label": "Options",
                                                icon: /*#__PURE__*/ jsx_runtime_.jsx(icons_.ChevronDownIcon, {}),
                                                variant: "none",
                                                px: 0,
                                                py: 0,
                                                mx: 0,
                                                my: 0
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(react_.MenuList, {
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(react_.MenuItem, {
                                                    onClick: async ()=>{
                                                        deleteMessageHandler(item);
                                                    },
                                                    children: "Unsend message"
                                                })
                                            })
                                        ]
                                    })
                                }) : null
                            ]
                        }) : item.type === 'audio' ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Flex, {
                            className: "justify-end relative",
                            boxSize: !item.deleted ? 'sm' : '',
                            bg: !item.deleted ? 'red' : 'black',
                            minW: !item.deleted ? '100px' : '',
                            maxW: !item.deleted ? '350px' : '',
                            my: "1",
                            p: !item.deleted ? '0' : '3',
                            children: [
                                !item.deleted ? /*#__PURE__*/ jsx_runtime_.jsx((external_react_audio_player_default()), {
                                    src: item.src,
                                    controls: true
                                }) : /*#__PURE__*/ jsx_runtime_.jsx(react_.Text, {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                        children: item.content
                                    })
                                }),
                                !item.deleted ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Menu, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(react_.MenuButton, {
                                            as: react_.IconButton,
                                            "aria-label": "Options",
                                            icon: /*#__PURE__*/ jsx_runtime_.jsx(icons_.ChevronDownIcon, {}),
                                            variant: "none",
                                            px: 0,
                                            py: 0,
                                            mx: 0,
                                            my: 0
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(react_.MenuList, {
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(react_.MenuItem, {
                                                onClick: async ()=>{
                                                    deleteMessageHandler(item);
                                                },
                                                children: "Unsend message"
                                            })
                                        })
                                    ]
                                }) : null
                            ]
                        }) : null
                    }, index));
                } else {
                    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Flex, {
                        className: "items-start",
                        w: "100%",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(react_.Avatar, {
                                size: "sm",
                                name: item.sender.username,
                                className: "mr-2"
                            }),
                            item.type === 'text' ? /*#__PURE__*/ jsx_runtime_.jsx(react_.Flex, {
                                bg: "gray.100",
                                color: "black",
                                minW: "100px",
                                maxW: "350px",
                                my: "1",
                                p: "3",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Text, {
                                    children: !item.deleted ? item.content : /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                        children: item.content
                                    })
                                })
                            }) : item.type === 'image' ? /*#__PURE__*/ jsx_runtime_.jsx(react_.Flex, {
                                className: "justify-end relative",
                                boxSize: !item.deleted ? 'sm' : '',
                                bg: !item.deleted ? 'red' : 'black',
                                minW: !item.deleted ? '100px' : '',
                                maxW: !item.deleted ? '350px' : '',
                                my: "1",
                                p: !item.deleted ? '0' : '3',
                                children: !item.deleted ? /*#__PURE__*/ jsx_runtime_.jsx(react_.Image, {
                                    src: item.src,
                                    alt: item.content
                                }) : /*#__PURE__*/ jsx_runtime_.jsx(react_.Text, {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                        children: item.content
                                    })
                                })
                            }) : item.type === 'audio' ? /*#__PURE__*/ jsx_runtime_.jsx(react_.Flex, {
                                className: "justify-end relative",
                                boxSize: !item.deleted ? 'sm' : '',
                                bg: !item.deleted ? 'red' : 'black',
                                minW: !item.deleted ? '100px' : '',
                                maxW: !item.deleted ? '350px' : '',
                                my: "1",
                                p: !item.deleted ? '0' : '3',
                                children: !item.deleted ? /*#__PURE__*/ jsx_runtime_.jsx((external_react_audio_player_default()), {
                                    src: item.src,
                                    controls: true
                                }) : /*#__PURE__*/ jsx_runtime_.jsx(react_.Text, {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                        children: item.content
                                    })
                                })
                            }) : null
                        ]
                    }, index));
                }
            }) : null
        })
    }));
};
/* harmony default export */ const noon_Messages = (Messages);


/***/ }),

/***/ 888:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _generated_graphql__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9402);
/* harmony import */ var _store_users__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5565);
/* harmony import */ var _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4513);
/* harmony import */ var _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_icons__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8930);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _store_chat__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7917);
/* harmony import */ var _components_SocketIo_SocketConnector__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6170);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _store_ui__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9224);
/* harmony import */ var _components_PrivateConversationListing__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(9499);
/* harmony import */ var _components_GroupConversationListing__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(4435);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_SocketIo_SocketConnector__WEBPACK_IMPORTED_MODULE_8__]);
_components_SocketIo_SocketConnector__WEBPACK_IMPORTED_MODULE_8__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];













function Sidebar() {
    var ref, ref1;
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_9__.useRouter)();
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
    const [, logout] = (0,_generated_graphql__WEBPACK_IMPORTED_MODULE_3__/* .useLogoutMutation */ ._y)();
    const loggedInUser = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(_store_users__WEBPACK_IMPORTED_MODULE_4__/* .getLoggedInUser */ .r);
    const getConversationsFromStore = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(_store_chat__WEBPACK_IMPORTED_MODULE_7__/* .getSortedConversations */ .V1);
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col bg-neutral text-white box-content scroll-auto",
        style: {
            flex: '0.25',
            height: '100vh'
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Flex, {
                className: "items-center justify-between border-b",
                style: {
                    flex: '0.05'
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Heading, {
                        className: "w-full px-4",
                        children: "Noon"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Menu, {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.MenuButton, {
                                as: _chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.IconButton,
                                "aria-label": "Options",
                                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_icons__WEBPACK_IMPORTED_MODULE_5__.HamburgerIcon, {}),
                                variant: "outline",
                                className: "mr-3"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.MenuList, {
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.MenuItem, {
                                    icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_icons__WEBPACK_IMPORTED_MODULE_5__.EditIcon, {}),
                                    onClick: async ()=>{
                                        dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_7__/* .setActiveConversationSet */ .bC)(false));
                                        dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_7__/* .setActiveConversee */ .HJ)(null));
                                        dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_7__/* .setActiveConversation */ .K4)(null));
                                        dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_7__/* .setShouldPauseCheckHasMore */ .J0)(false));
                                        dispatch((0,_store_ui__WEBPACK_IMPORTED_MODULE_10__/* .setCreateGroupComponent */ .iD)(true));
                                        dispatch((0,_store_ui__WEBPACK_IMPORTED_MODULE_10__/* .setSearchComponent */ .JD)({
                                            searchActive: false,
                                            containerDisplay: 'relative',
                                            containerHeight: '5vh',
                                            inputPadding: '5px'
                                        }));
                                    },
                                    children: "Create group"
                                })
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Flex, {
                className: "flex-col pt-3 scroll-auto overflow-auto",
                style: {
                    flex: '0.875'
                },
                children: getConversationsFromStore ? [
                    ...Object.values(getConversationsFromStore)
                ].map((conversation, i)=>!conversation ? null : conversation.type === 'pm' ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_PrivateConversationListing__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                        conversation: conversation,
                        i: i
                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_GroupConversationListing__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z, {
                        conversation: conversation,
                        i: i
                    })
                ) : null
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Flex, {
                className: "flex justify-between items-center border-t box-content",
                style: {
                    flex: '0.075'
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Flex, {
                        className: "items-center px-2 ",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Avatar, {
                                size: "md"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "ml-2 text-md",
                                children: (ref = loggedInUser.user) === null || ref === void 0 ? void 0 : (ref1 = ref.profile) === null || ref1 === void 0 ? void 0 : ref1.username
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_SocketIo_SocketConnector__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {})
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Flex, {
                        className: "px-3 justify-between",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Menu, {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.MenuButton, {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_icons__WEBPACK_IMPORTED_MODULE_5__.SettingsIcon, {})
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.MenuList, {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.MenuItem, {
                                        onClick: async ()=>{
                                            await logout();
                                            await router.push('/');
                                        },
                                        children: "Logout"
                                    })
                                })
                            ]
                        })
                    })
                ]
            })
        ]
    }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sidebar);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2698:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8930);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5152);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _store_users__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5565);
/* harmony import */ var _store_video__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4912);
/* harmony import */ var _generated_graphql__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9402);
/* harmony import */ var _store_chat__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7917);









const JitsiMeeting = (0,next_dynamic__WEBPACK_IMPORTED_MODULE_3__["default"])(null, {
    loadableGenerated: {
        modules: [
            "noon/Video.tsx -> " + "@jitsi/react-sdk"
        ]
    },
    ssr: false
});
const Video = ({ conversationUuid , profile , email  })=>{
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useDispatch)();
    const loggedInUser = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector)(_store_users__WEBPACK_IMPORTED_MODULE_5__/* .getLoggedInUser */ .r);
    const activeConversation = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector)(_store_chat__WEBPACK_IMPORTED_MODULE_8__/* .getActiveConversation */ .tI);
    // const activeConversee = useSelector(getActiveConversee)
    // const shouldPauseCheckHasMore = useSelector(getShouldPauseCheckHasMore)
    const apiRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
    const { 0: logItems , 1: updateLog  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { 0: showNew  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: knockingParticipants , 1: updateKnockingParticipants  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [, cancelPendingCallForConversation] = (0,_generated_graphql__WEBPACK_IMPORTED_MODULE_7__/* .useCancelPendingCallForConversationMutation */ .Fg)();
    const printEventOutput = (payload)=>{
        updateLog((items)=>[
                ...items,
                JSON.stringify(payload)
            ]
        );
    };
    const handleAudioStatusChange = (payload, feature)=>{
        if (payload.muted) {
            updateLog((items)=>[
                    ...items,
                    `${feature} off`
                ]
            );
        } else {
            updateLog((items)=>[
                    ...items,
                    `${feature} on`
                ]
            );
        }
    };
    const handleOnReadyToClose = async ()=>{
        var ref, ref1, ref2, ref3;
        dispatch((0,_store_video__WEBPACK_IMPORTED_MODULE_6__/* .setVideoFrameForConversation */ .Iw)(false));
        dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_8__/* .cancelPendingCall */ .zz)({
            conversationUuid: activeConversation.uuid,
            loggedInProfileUuid: (ref = loggedInUser.user) === null || ref === void 0 ? void 0 : (ref1 = ref.profile) === null || ref1 === void 0 ? void 0 : ref1.uuid
        }));
        await cancelPendingCallForConversation({
            conversationUuid: activeConversation.uuid,
            profileUuid: (ref2 = loggedInUser.user) === null || ref2 === void 0 ? void 0 : (ref3 = ref2.profile) === null || ref3 === void 0 ? void 0 : ref3.uuid
        });
    };
    const handleChatUpdates = (payload)=>{
        if (payload.isOpen || !payload.unreadCount) {
            return;
        }
        if (apiRef.current) apiRef.current.executeCommand('toggleChat');
        updateLog((items)=>[
                ...items,
                `you have ${payload.unreadCount} unread messages`, 
            ]
        );
    };
    const handleKnockingParticipant = (payload)=>{
        updateLog((items)=>[
                ...items,
                JSON.stringify(payload)
            ]
        );
        updateKnockingParticipants((participants)=>{
            return [
                ...participants,
                payload === null || payload === void 0 ? void 0 : payload.participant, 
            ];
        });
    };
    const resolveKnockingParticipants = (condition)=>{
        knockingParticipants.forEach((participant)=>{
            var ref;
            apiRef.current.executeCommand('answerKnockingParticipant', (ref = participant) === null || ref === void 0 ? void 0 : ref.id, condition(participant));
            updateKnockingParticipants((participants)=>participants.filter((item)=>item.id === participant.id
                )
            );
        });
    };
    resolveKnockingParticipants('3');
    const handleJitsiIFrameRef1 = (iframeRef)=>{
        iframeRef.style.background = '#3d3d3d';
        iframeRef.style.height = '900px';
    };
    const handleApiReady = (apiObj)=>{
        apiRef.current = apiObj(apiRef === null || apiRef === void 0 ? void 0 : apiRef.current).on('knockingParticipant', handleKnockingParticipant)(apiRef === null || apiRef === void 0 ? void 0 : apiRef.current).on('audioMuteStatusChanged', (payload)=>handleAudioStatusChange(payload, 'audio')
        )(apiRef === null || apiRef === void 0 ? void 0 : apiRef.current).on('videoMuteStatusChanged', (payload)=>handleAudioStatusChange(payload, 'video')
        )(apiRef === null || apiRef === void 0 ? void 0 : apiRef.current).on('raiseHandUpdated', printEventOutput)(apiRef === null || apiRef === void 0 ? void 0 : apiRef.current).on('titleViewChanged', printEventOutput)(apiRef === null || apiRef === void 0 ? void 0 : apiRef.current).on('chatUpdated', handleChatUpdates)(apiRef === null || apiRef === void 0 ? void 0 : apiRef.current).on('knockingParticipant', handleKnockingParticipant);
    };
    handleApiReady({
        'ddd': 'ded'
    });
    const handleReadyToClose = ()=>{
        /* eslint-disable-next-line no-alert */ alert('Ready to close...');
    };
    handleReadyToClose();
    const generateRoomName = ()=>`JitsiMeetRoomNo${Math.random() * 100}-${Date.now()}`
    ;
    generateRoomName();
    // Multiple instances demo
    const renderNewInstance = ()=>{
        if (!showNew) {
            return null;
        }
        return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(JitsiMeeting, {
            domain: 'noon-vid.com/',
            // roomName={generateRoomName()}
            roomName: conversationUuid,
            onReadyToClose: handleOnReadyToClose,
            spinner: renderSpinner,
            // config={{
            //   subject: 'lalalala',
            //   hideConferenceSubject: false,
            // }}
            configOverwrite: {
                startWithAudioMuted: true,
                disableModeratorIndicator: true,
                startScreenSharing: false,
                enableEmailInStats: false
            },
            getIFrameRef: handleJitsiIFrameRef1
        }));
    };
    const renderLog = ()=>logItems.map((item, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                style: {
                    fontFamily: 'monospace',
                    padding: '5px'
                },
                children: item
            }, index)
        )
    ;
    const renderSpinner = ()=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            style: {
                fontFamily: 'sans-serif',
                textAlign: 'center'
            },
            children: "Loading..."
        })
    ;
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {
        // overflowY="auto"
        flexDirection: "column-reverse",
        className: "w-full top-0 py-3 px-5 relative",
        style: {
            height: '80vh'
        },
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(JitsiMeeting, {
                domain: 'noon-vid.com/',
                // roomName={generateRoomName()}
                roomName: conversationUuid,
                onReadyToClose: handleOnReadyToClose,
                spinner: renderSpinner,
                userInfo: {
                    displayName: profile.username,
                    email: email
                },
                // config={{
                //   hideConferenceSubject: false,
                // }}
                interfaceConfigOverwrite: {},
                configOverwrite: {
                    startWithAudioMuted: true,
                    disableModeratorIndicator: true,
                    startScreenSharing: false,
                    enableEmailInStats: false
                },
                getIFrameRef: handleJitsiIFrameRef1
            }),
            renderNewInstance(),
            renderLog()
        ]
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Video);


/***/ }),

/***/ 150:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_urql__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2094);
/* harmony import */ var next_urql__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_urql__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_createUrqlClient__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4711);
/* harmony import */ var _Sidebar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(888);
/* harmony import */ var _generated_graphql__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9402);
/* harmony import */ var _utils_isServer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7786);
/* harmony import */ var _store_users__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5565);
/* harmony import */ var _store_chat__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7917);
/* harmony import */ var _Chat__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9306);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils_createUrqlClient__WEBPACK_IMPORTED_MODULE_4__, _Sidebar__WEBPACK_IMPORTED_MODULE_5__, _Chat__WEBPACK_IMPORTED_MODULE_9__]);
([_utils_createUrqlClient__WEBPACK_IMPORTED_MODULE_4__, _Sidebar__WEBPACK_IMPORTED_MODULE_5__, _Chat__WEBPACK_IMPORTED_MODULE_9__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);











function Noon() {
    var ref3, ref1;
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
    const [{ data  }] = (0,_generated_graphql__WEBPACK_IMPORTED_MODULE_6__/* .useMeQuery */ .UE)({
        pause: (0,_utils_isServer__WEBPACK_IMPORTED_MODULE_10__/* .isServer */ .s)(),
        requestPolicy: 'network-only'
    });
    // const [, logout] = useLogoutMutation()
    const loggedInUser = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(_store_users__WEBPACK_IMPORTED_MODULE_7__/* .getLoggedInUser */ .r);
    const conversations = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(_store_chat__WEBPACK_IMPORTED_MODULE_8__/* .getConversations */ .uv);
    const [{ data: fetchedConversations  }] = (0,_generated_graphql__WEBPACK_IMPORTED_MODULE_6__/* .useGetConversationForLoggedInUserQuery */ .Yq)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        dispatch((0,_store_users__WEBPACK_IMPORTED_MODULE_7__/* .setLoggedInUser */ .yM)({
            user: data
        }));
    }, [
        data === null || data === void 0 ? void 0 : (ref3 = data.me) === null || ref3 === void 0 ? void 0 : ref3.username
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if ((fetchedConversations === null || fetchedConversations === void 0 ? void 0 : fetchedConversations.getConversationForLoggedInUser) && conversations === null) {
            var ref, ref2;
            dispatch((0,_store_chat__WEBPACK_IMPORTED_MODULE_8__/* .setConversations */ .i_)({
                conversationsToSend: fetchedConversations === null || fetchedConversations === void 0 ? void 0 : fetchedConversations.getConversationForLoggedInUser,
                loggedInProfileUuid: loggedInUser === null || loggedInUser === void 0 ? void 0 : (ref = loggedInUser.user) === null || ref === void 0 ? void 0 : (ref2 = ref.profile) === null || ref2 === void 0 ? void 0 : ref2.uuid
            }));
        }
    }, [
        fetchedConversations
    ]);
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "flex",
        style: {
            overflow: 'hidden'
        },
        children: ((ref1 = loggedInUser.user) === null || ref1 === void 0 ? void 0 : ref1.profile) ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Sidebar__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {}),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Chat__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {})
            ]
        }) : null
    }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_urql__WEBPACK_IMPORTED_MODULE_3__.withUrqlClient)(_utils_createUrqlClient__WEBPACK_IMPORTED_MODULE_4__/* .createUrqlClient */ .M, {
    ssr: true
})(Noon));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7917:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "V$": () => (/* binding */ addConversation),
  "Yn": () => (/* binding */ addMessageToActiveConversation),
  "eJ": () => (/* binding */ addMessagesToConversation),
  "zz": () => (/* binding */ cancelPendingCall),
  "Wj": () => (/* binding */ clearUnreadMessagesForConversationInStore),
  "HT": () => (/* binding */ deleteMessageInStore),
  "tI": () => (/* binding */ getActiveConversation),
  "e$": () => (/* binding */ getActiveConversationSet),
  "PY": () => (/* binding */ getActiveConversee),
  "uv": () => (/* binding */ getConversations),
  "g": () => (/* binding */ getShouldPauseCheckHasMore),
  "V1": () => (/* binding */ getSortedConversations),
  "Ae": () => (/* binding */ removeConversation),
  "fN": () => (/* binding */ removeParticipantFromGroup),
  "K4": () => (/* binding */ setActiveConversation),
  "PQ": () => (/* binding */ setActiveConversationHasMoreMessages),
  "bC": () => (/* binding */ setActiveConversationSet),
  "HJ": () => (/* binding */ setActiveConversee),
  "q7": () => (/* binding */ setActiveGroupInStore),
  "i_": () => (/* binding */ setConversations),
  "lT": () => (/* binding */ setOngoingCall),
  "gu": () => (/* binding */ setPendingCall),
  "J0": () => (/* binding */ setShouldPauseCheckHasMore)
});

// UNUSED EXPORTS: addMessageToConversationByConversationUuid, default, getConversationsThatHaveUnreadMessagesForProfile

// EXTERNAL MODULE: external "@reduxjs/toolkit"
var toolkit_ = __webpack_require__(5184);
// EXTERNAL MODULE: external "reselect"
var external_reselect_ = __webpack_require__(6814);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
// EXTERNAL MODULE: ./src/store/sockets.js
var sockets = __webpack_require__(6135);
;// CONCATENATED MODULE: external "uuidv4"
const external_uuidv4_namespaceObject = require("uuidv4");
;// CONCATENATED MODULE: ./src/store/chat.js





const slice = (0,toolkit_.createSlice)({
    name: 'chat',
    initialState: {
        conversations: null,
        activeConversee: null,
        activeConversation: null,
        conversationsThatHaveUnreadMessagesForProfile: [],
        activeConversationSet: false,
        shouldPauseCheckHasMore: false
    },
    reducers: {
        setActiveConversationSet: (chat, action)=>{
            chat.activeConversationSet = action.payload;
        },
        addConversation: (chat, action)=>{
            let conversationObject = {
                ...action.payload.conversation
            };
            console.log('conversation object:', conversationObject);
            if (conversationObject.type !== 'group') {
                var ref;
                conversationObject.conversee = (ref = conversationObject.profiles) === null || ref === void 0 ? void 0 : ref.find((element)=>element.uuid != action.payload.loggedInProfileUuid
                );
            }
            // if (
            //   conversation.unreadMessages !== 0 &&
            //   conversation.profileThatHasUnreadMessages ===
            //     action.payload.loggedInProfileUuid
            // ) {
            //   chat.conversationsThatHaveUnreadMessagesForProfile.push(
            //     conversation.uuid
            //   )
            // }
            // conversationObject.ongoingCall = false
            chat.conversations.push(conversationObject);
        },
        removeConversation: (chat, action)=>{
            chat.conversations = chat.conversations.filter((conversation)=>conversation.uuid != action.payload.conversationUuid
            );
        },
        removeParticipantFromGroup: (chat, action)=>{
            const conversation1 = chat.conversations.find((conversation)=>conversation.uuid === action.payload.conversationUuid
            );
            const profiles = [
                ...conversation1.profiles
            ];
            profiles.splice(profiles.indexOf(action.payload.participantUuid), 1);
            conversation1.profiles = profiles;
            if (chat.activeConversation && chat.activeConversation.uuid === action.payload.conversationUuid) {
                let activeConversationProfiles = [
                    ...chat.activeConversation.profiles
                ];
                activeConversationProfiles = activeConversationProfiles.filter((profile)=>profile.uuid != action.payload.participantUuid
                );
                chat.activeConversation.profiles = activeConversationProfiles;
            }
        },
        setConversations: (chat, action)=>{
            const conversationsArray = [];
            Promise.all(action.payload.conversationsToSend.map((conversation)=>{
                var ref;
                let conversationObject = {
                    ...conversation
                };
                const converseeObject = conversationObject.profiles.find((element)=>element.uuid != action.payload.loggedInProfileUuid
                );
                const callObject = (ref = conversationObject.calls) === null || ref === void 0 ? void 0 : ref.find((call)=>call.profileUuid === action.payload.loggedInProfileUuid
                );
                if (conversation.unreadMessages !== 0 && conversation.profileThatHasUnreadMessages === action.payload.loggedInProfileUuid) {
                    chat.conversationsThatHaveUnreadMessagesForProfile.push(conversation.uuid);
                }
                // if (conversationObject.call) {
                conversationObject.pendingCall = callObject.pendingCall;
                conversationObject.ongoingCall = callObject.ongoingCall;
                // }
                conversationObject.conversee = converseeObject;
                conversationsArray.push(conversationObject);
            }));
            chat.conversations = conversationsArray;
        },
        addMessagesToConversation: (chat, action)=>{
            var ref, ref1;
            let conversationUuid = action.payload.conversationUuid;
            let messages = action.payload.messages;
            let loggedInProfileUuid = (ref = action.payload.loggedInUser.user) === null || ref === void 0 ? void 0 : (ref1 = ref.profile) === null || ref1 === void 0 ? void 0 : ref1.uuid;
            if (chat.activeConversation && chat.activeConversation.uuid === conversationUuid) {
                let tempMessages = [
                    ...chat.activeConversation.messages
                ];
                Promise.all(messages.map((message)=>{
                    if (message.sender.uuid === loggedInProfileUuid) {
                        message = {
                            ...message,
                            from: 'me'
                        };
                    } else {
                        message = {
                            ...message,
                            from: 'other'
                        };
                    }
                    tempMessages.push(message);
                }));
                let sortedMessages = tempMessages.sort((a, b)=>b.createdAt - a.createdAt
                );
                console.log('sorted messages:', sortedMessages);
                chat.activeConversation.messages = sortedMessages;
            // const conversationn = chat.conversations.find(
            //   (conversation) => conversation.uuid === conversationUuid
            // )
            // conversationn.messages.push(messages)
            }
        },
        addMessageToActiveConversation: (chat, action)=>{
            let conversationUuid = action.payload.conversationUuid;
            console.log('chat active converastion:', chat.activeConversation);
            console.log('payload.conversationUuid:', action.payload.conversationUuid);
            console.log('action.payload:', action.payload);
            if (chat.activeConversation && chat.activeConversation.uuid === conversationUuid) {
                var ref, ref2, ref3, ref4;
                chat.activeConversation.messages.unshift({
                    uuid: action.payload.uuid,
                    content: action.payload.message,
                    updatedAt: new Date().getTime(),
                    createdAt: new Date().getTime(),
                    from: action.payload.from,
                    type: action.payload.type,
                    src: action.payload.src,
                    deleted: action.payload.deleted,
                    sender: {
                        uuid: (ref = action.payload.sender) === null || ref === void 0 ? void 0 : ref.uuid,
                        username: (ref2 = action.payload.sender) === null || ref2 === void 0 ? void 0 : ref2.username
                    }
                });
                const conversationn = chat.conversations.find((conversation)=>conversation.uuid === conversationUuid
                );
                conversationn.messages.unshift({
                    uuid: action.payload.uuid,
                    content: action.payload.message,
                    // updatedAt: action.payload.updatedAt,
                    // createdAt: action.payload.createdAt,
                    updatedAt: new Date().getTime(),
                    createdAt: new Date().getTime(),
                    type: action.payload.type,
                    src: action.payload.src,
                    deleted: action.payload.deleted,
                    sender: {
                        uuid: (ref3 = action.payload.sender) === null || ref3 === void 0 ? void 0 : ref3.uuid,
                        username: (ref4 = action.payload.sender) === null || ref4 === void 0 ? void 0 : ref4.username
                    }
                });
            } else {
                var ref5, ref6;
                const conversationn = chat.conversations.find((conversation)=>conversation.uuid === conversationUuid
                );
                conversationn.unreadMessages = conversationn.unreadMessages + 1;
                conversationn.profileThatHasUnreadMessages = action.payload.loggedInProfile.uuid;
                if (chat.conversationsThatHaveUnreadMessagesForProfile[conversationUuid] == undefined) {
                    chat.conversationsThatHaveUnreadMessagesForProfile.push(conversationUuid);
                }
                conversationn.messages.unshift({
                    uuid: action.payload.uuid,
                    content: action.payload.message,
                    updatedAt: new Date().getTime(),
                    createdAt: new Date().getTime(),
                    from: action.payload.from,
                    type: action.payload.type,
                    src: action.payload.src,
                    deleted: action.payload.deleted,
                    sender: {
                        uuid: (ref5 = action.payload.sender) === null || ref5 === void 0 ? void 0 : ref5.uuid,
                        username: (ref6 = action.payload.sender) === null || ref6 === void 0 ? void 0 : ref6.username
                    }
                });
            }
        },
        addMessageToConversationByConversationUuid: (chat, action)=>{
            let conversationUuid = action.payload.conversationUuid;
            let message = action.payload.message;
            const conversationn = chat.conversations.find((conversation)=>conversation.uuid === conversationUuid
            );
            conversationn.messages.push({
                uuid: (0,external_uuidv4_namespaceObject.uuid)(),
                content: action.payload.message,
                updatedAt: new Date(),
                createdAt: new Date(),
                from: action.payload.from,
                sender: {
                    uuid: action.payload.loggedInUser.uuid,
                    username: action.payload.loggedInUser.username
                }
            });
        },
        setActiveConversee: (chat, action)=>{
            // console.log('set active conversee uuid:', action.payload)
            chat.activeConversee = action.payload;
        },
        clearUnreadMessagesForConversationInStore: (chat, action)=>{
            const conversation = chat.activeConversation;
            conversation.unreadMessages = 0;
            conversation.profileThatHasUnreadMessages = [];
        },
        setActiveConversationHasMoreMessages: (chat, action)=>{
            chat.activeConversation.hasMore = action.payload;
        },
        setShouldPauseCheckHasMore: (chat, action)=>{
            chat.shouldPauseCheckHasMore = action.payload;
        },
        setActiveConversation: (chat, action)=>{
            if (action.payload === null) {
                chat.activeConversation = null;
                return;
            }
            let index = chat.conversationsThatHaveUnreadMessagesForProfile.indexOf(action.payload.conversation.uuid);
            if (index > -1) {
                chat.conversationsThatHaveUnreadMessagesForProfile.splice(index, 1);
            }
            // chat.conversationsThatHaveUnreadMessagesForProfile =
            //   chat.conversationsThatHaveUnreadMessagesForProfile.filter(
            //     (conversationUuid) =>
            //       conversationUuid === action.payload.conversation.uuid
            //   )
            let conversationObject = {
                ...action.payload.conversation
            };
            // conversationObject.unreadMessages = 0
            // conversationObject.profileThatHasUnreadMessages = []
            const conversationFromStack = chat.conversations.find((conversation)=>conversation.uuid === conversationObject.uuid
            );
            let callInConversationStack = conversationFromStack.calls.find((call)=>call.profileUuid === action.payload.loggedInProfileUuid
            );
            // let callInActiveConversation = conversationObject.calls.find(
            //   (call) => call.profileUuid === action.payload.loggedInProfileUuid
            // )
            conversationObject.pendingCall = callInConversationStack.pendingCall;
            conversationFromStack.unreadMessages = 0;
            conversationFromStack.profileThatHasUnreadMessages = [];
            conversationFromStack.ongoingCall = false;
            if (!action.payload.conversation.messages) {
                conversationObject.messages = [];
            } else {
                let messagesArray = [];
                action.payload.conversation.messages.map((message)=>{
                    let messageObject = {
                        ...message
                    };
                    messageObject.from = messageObject.sender.uuid == action.payload.loggedInProfileUuid ? 'me' : 'computer';
                    messagesArray.push(messageObject);
                });
                let sortedMessage = messagesArray.sort((a, b)=>b.createdAt - a.createdAt
                );
                conversationObject.messages = [
                    ...sortedMessage
                ];
            }
            if (!chat['activeConversation']) {
                chat['activeConversation'] = null;
            }
            chat.activeConversation = conversationObject;
        },
        setOngoingCall: (chat, action)=>{
            let activeConversationObject = {
                ...chat.activeConversation
            };
            activeConversationObject.ongoingCall = action.payload;
            chat.activeConversation = {
                ...activeConversationObject
            };
        },
        setActiveGroupInStore: (chat, action)=>{
            if (action.payload === null) {
                chat.activeConversation = null;
                return;
            }
            let conversationObject = {
                ...action.payload.conversation
            };
            // conversationObject.unreadMessages = 0
            // conversationObject.profileThatHasUnreadMessages = []
            const conversationFromStack = chat.conversations.find((conversation)=>conversation.uuid === conversationObject.uuid
            );
            conversationFromStack.unreadMessages = 0;
            conversationFromStack.profileThatHasUnreadMessages = [];
            conversationFromStack.ongoingCall = false;
            if (!action.payload.conversation.messages) {
                conversationObject.messages = [];
            } else {
                let messagesArray = [];
                action.payload.conversation.messages.map((message)=>{
                    let messageObject = {
                        ...message
                    };
                    messageObject.from = messageObject.sender.uuid == action.payload.loggedInProfileUuid ? 'me' : 'computer';
                    messagesArray.push(messageObject);
                });
                let sortedMessage = messagesArray.sort((a, b)=>b.createdAt - a.createdAt
                );
                conversationObject.messages = [
                    ...sortedMessage
                ];
            }
            if (!chat['activeConversation']) {
                chat['activeConversation'] = null;
            }
            chat.activeConversation = conversationObject;
        },
        setPendingCall: (chat, action)=>{
            try {
                var ref7;
                if (chat.activeConversation && chat.activeConversation.uuid === ((ref7 = action.payload) === null || ref7 === void 0 ? void 0 : ref7.conversationUuid) && action.payload.profileUuid !== action.payload.from) {
                    let activeConversationObject = {
                        ...chat.activeConversation
                    };
                    activeConversationObject.pendingCall = action.payload.pendingCall;
                    let callInActiveConversationObject = activeConversationObject.calls.find((call)=>call.profileUuid === action.payload.profileUuid
                    );
                    callInActiveConversationObject.pendingCall = action.payload.pendingCall;
                    chat.activeConversation = {
                        ...activeConversationObject
                    };
                }
                const conversationInList = chat.conversations.find((conversation)=>{
                    var ref;
                    return conversation.uuid === ((ref = action.payload) === null || ref === void 0 ? void 0 : ref.conversationUuid);
                });
                let callInConversationObject = conversationInList.calls.find((call)=>call.profileUuid === action.payload.profileUuid
                );
                if (!action.payload.fromJoin) {
                    callInConversationObject.pendingCall = action.payload.pendingCall;
                }
                conversationInList.pendingCall = action.payload.pendingCall;
            } catch (e) {
                console.log('error:', e);
            }
        },
        cancelPendingCall: (chat, action)=>{
            if (chat.activeConversation) {
                let activeConversationObject = {
                    ...chat.activeConversation
                };
                let callInActiveConversation = activeConversationObject.calls.find((call)=>call.profileUuid === action.payload.loggedInProfileUuid
                );
                callInActiveConversation.pendingCall = false;
                activeConversationObject.pendingCall = false;
                activeConversationObject.pendingCallProfile = null;
                chat.activeConversation = {
                    ...activeConversationObject
                };
            }
            let conversationInList = chat.conversations.find((conversation)=>conversation.uuid === action.payload.conversationUuid
            );
            let callInConversationInList = conversationInList.calls.find((call)=>call.profileUuid === action.payload.loggedInProfileUuid
            );
            callInConversationInList.pendingCall = false;
            conversationInList.pendingCall = false;
            conversationInList.pendingCallProfile = null;
        },
        deleteMessageInStore: (chat, action)=>{
            console.log('message in update message:', action.payload);
            try {
                let conversation2 = chat.conversations.find((conversation)=>conversation.uuid === action.payload.conversationUuid
                );
                let messageInConversation = conversation2.messages.find((message)=>message.uuid === action.payload.uuid
                );
                console.log('message in update message:', action.payload.message);
                messageInConversation.deleted = action.payload.deleted;
                messageInConversation.content = action.payload.content;
                if (chat.activeConversation) {
                    let messageInActiveConversation = chat.activeConversation.messages.find((message)=>message.uuid === action.payload.uuid
                    );
                    messageInActiveConversation.deleted = action.payload.deleted;
                    messageInActiveConversation.content = action.payload.content;
                }
            // messageInConversation = { ...action.payload.message }
            } catch (e) {
                console.log('error:', e);
            }
        }
    }
});
const getConversations = (0,external_reselect_.createSelector)((state)=>state.entities.chat
, (chat)=>chat.conversations
);
const getSortedConversations = (0,external_reselect_.createSelector)((state)=>state.entities.chat
, (chat)=>chat.conversations
);
const getActiveConversee = (0,external_reselect_.createSelector)((state)=>state.entities.chat
, (chat)=>chat.activeConversee
);
const getActiveConversation = (0,external_reselect_.createSelector)((state)=>state.entities.chat
, (chat)=>chat.activeConversation
);
const getActiveConversationSet = (0,external_reselect_.createSelector)((state)=>state.entities.chat
, (chat)=>chat.activeConversationSet
);
const getShouldPauseCheckHasMore = (0,external_reselect_.createSelector)((state)=>state.entities.chat
, (chat)=>chat.shouldPauseCheckHasMore
);
const getConversationsThatHaveUnreadMessagesForProfile = (0,external_reselect_.createSelector)((state)=>state.entities.chat
, (chat)=>chat.conversationsThatHaveUnreadMessagesForProfile
);
const { addConversation , removeConversation , setConversations , setActiveConversee , setActiveConversation , addMessageToActiveConversation , addMessagesToConversation , addMessageToConversationByConversationUuid , clearUnreadMessagesForConversationInStore , setActiveConversationSet , setOngoingCall , setPendingCall , cancelPendingCall , setActiveConversationHasMoreMessages , setShouldPauseCheckHasMore , setActiveGroupInStore , removeParticipantFromGroup , deleteMessageInStore ,  } = slice.actions;
/* harmony default export */ const chat = (slice.reducer);


/***/ }),

/***/ 6135:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hb": () => (/* binding */ getSocket),
/* harmony export */   "uU": () => (/* binding */ setSocket)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6814);
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(reselect__WEBPACK_IMPORTED_MODULE_1__);


let lastId = 0;
const slice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: 'sockets',
    initialState: {
        socket: null
    },
    reducers: {
        setSocket: (sockets, action)=>{
            sockets.socket = action.payload.socket;
        }
    }
});
const getSocket = (0,reselect__WEBPACK_IMPORTED_MODULE_1__.createSelector)((state)=>state.entities.sockets
, (sockets)=>sockets.socket
);
const { setSocket  } = slice.actions;
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (slice.reducer);


/***/ }),

/***/ 9224:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hw": () => (/* binding */ getCreateGroupComponent),
/* harmony export */   "Rg": () => (/* binding */ getSearchComponentState),
/* harmony export */   "RG": () => (/* binding */ getChatContainerHeight),
/* harmony export */   "iD": () => (/* binding */ setCreateGroupComponent),
/* harmony export */   "JD": () => (/* binding */ setSearchComponent),
/* harmony export */   "Ov": () => (/* binding */ setChatContainerHeight)
/* harmony export */ });
/* unused harmony exports getChatComponentState, showFriendshipRequestToast, setChatComponentState */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6814);
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(reselect__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _sockets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6135);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);





// import { createAsyncThunk } from '@reduxjs/toolkit/src/createAsyncThunk'
let lastId = 0;
// const socket = (state) => state.sockets.socket
const slice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: 'ui',
    initialState: {
        chatComponent: 'closed',
        createGroupComponentOpen: false,
        chatContainerHeight: '87.5vh',
        search: {
            searchActive: false,
            containerDisplay: 'relative',
            containerHeight: '5vh',
            inputPadding: '5px'
        }
    },
    reducers: {
        setSocket: (sockets, action)=>{
            sockets.socket = action.payload.socket;
        },
        showFriendshipRequestToast: (ui, action)=>{},
        setChatComponentState: (ui, action)=>{
            ui.chatComponent = action.payload;
        },
        setCreateGroupComponent: (ui, action)=>{
            ui.createGroupComponentOpen = action.payload;
        },
        setChatContainerHeight: (ui, action)=>{
            ui.chatContainerHeight = action.payload;
        },
        setSearchComponent: (ui, action)=>{
            ui.search.searchActive = action.payload.searchActive;
            ui.search.containerDisplay = action.payload.containerDisplay;
            ui.search.containerHeight = action.payload.containerHeight;
            ui.search.inputPadding = action.payload.inputPadding;
        // ui.search.searchInput = action.payload.searchInput
        // let [searchActive, setSearchActive] = useState(false)
        // let [containerHeight, setContainerHeight] = useState('5vh')
        // let [containerDisplay, setContainerDisplay] = useState('relative')
        // let [inputPadding, setInputPadding] = useState('5px')
        // let [searchInput, setSearchInput] = useState(null)
        }
    }
});
// export const socket = createAsyncThunk(
//   'sockets/socket',
//   async (_, thunkAPI) => {
//     const state = thunkAPI.getState()
//     console.log('GLOBAL STATE:', state)
//   }
// )
const getChatComponentState = (0,reselect__WEBPACK_IMPORTED_MODULE_1__.createSelector)((state)=>state.entities.ui
, (ui)=>ui.chatComponent
);
const getCreateGroupComponent = (0,reselect__WEBPACK_IMPORTED_MODULE_1__.createSelector)((state)=>state.entities.ui
, (ui)=>ui.createGroupComponentOpen
);
const getSearchComponentState = (0,reselect__WEBPACK_IMPORTED_MODULE_1__.createSelector)((state)=>state.entities.ui
, (ui)=>ui.search
);
const getChatContainerHeight = (0,reselect__WEBPACK_IMPORTED_MODULE_1__.createSelector)((state)=>state.entities.ui
, (ui)=>ui.chatContainerHeight
);
const { showFriendshipRequestToast , setChatComponentState , setCreateGroupComponent , setSearchComponent , setChatContainerHeight ,  } = slice.actions;
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (slice.reducer);


/***/ }),

/***/ 5565:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "r": () => (/* binding */ getLoggedInUser),
/* harmony export */   "yM": () => (/* binding */ setLoggedInUser),
/* harmony export */   "zP": () => (/* binding */ addFriendRequestEntry),
/* harmony export */   "t9": () => (/* binding */ removeFriendRequestEntry),
/* harmony export */   "cY": () => (/* binding */ addFriendEntry),
/* harmony export */   "ei": () => (/* binding */ removeFriendEntry)
/* harmony export */ });
/* unused harmony exports getUser, getBugsAssignedToUser, userAdded, assignBugToUser */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6814);
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(reselect__WEBPACK_IMPORTED_MODULE_1__);


let lastId = 0;
const slice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: 'users',
    initialState: {
        user: {}
    },
    reducers: {
        userAdded: (users, action)=>{
            users.push({
                id: ++lastId,
                name: action.payload.name,
                bugsAssigned: []
            });
        },
        assignBugToUser: (users, action)=>{
            const { bugId , userId  } = action.payload;
            const index = users.findIndex((user)=>user.id === userId
            );
            users[index].bugsAssigned.push(bugId);
        },
        setLoggedInUser: (users, action)=>{
            var ref;
            // console.log('retrieved user: ', action.payload)
            if ((ref = action.payload.user) === null || ref === void 0 ? void 0 : ref.me) {
                users.user = action.payload.user.me;
            }
        },
        addFriendRequestEntry: (users, action)=>{
            let userObject = {
                ...users.user
            };
            userObject.friendshipRequests.push(action.payload.friendRequest);
        },
        removeFriendRequestEntry: (users, action)=>{
            let friendRequests;
            friendRequests = action.payload.friendRequests.filter((FREntry)=>FREntry.uuid != action.payload.profileUuid
            );
            console.log('friend request entries:', friendRequests);
            users.user.friendshipRequests = friendRequests;
        },
        addFriendEntry: (users, action)=>{
            try {
                let userObject = {
                    ...users.user
                };
                console.log('add friend entry:', action.payload.friend);
                userObject.friends.push(action.payload.friend);
            } catch (e) {
                console.log('error:', e);
            }
        },
        removeFriendEntry: (users, action)=>{
            let friends;
            friends = action.payload.friends.filter((FREntry)=>FREntry.uuid != action.payload.profileUuid
            );
            users.user.friends = friends;
        }
    }
});
// selector
const getUser = (state, action)=>{
    return state.entities.users.filter((user)=>user.id === action.id
    );
// return state.entities.bugs.filter(bug => !bug.resolved)
};
const getLoggedInUser = (0,reselect__WEBPACK_IMPORTED_MODULE_1__.createSelector)((state)=>state.entities.users
, (user)=>user
);
const getBugsAssignedToUser = (state, action)=>{
    const user1 = state.entities.users.filter((user)=>user.id === action.id
    );
    const bugsForUser = [];
    for(let index = 0; index <= user1[0].bugsAssigned.length - 1; index++){
        const bug1 = state.entities.bugs.filter((bug)=>bug.id === user1[0].bugsAssigned[index]
        );
        bugsForUser.push(bug1);
    // const fef = [...bugsForUser, bug];
    }
    // for(const bugId in user[0].bugsAssigned){
    //     const bug = state.entities.bugs.filter(bug => bug.id === bugId);
    //
    //     return [...bugsForUser, bug];
    // }
    /*    user[0].bugsAssigned.map(bugId => {
        const bug = state.entities.bugs.filter(bug => bug.id === bugId);

        return [...bugsForUser, bug];
    })*/ return bugsForUser;
};
const { userAdded , assignBugToUser , setLoggedInUser , addFriendRequestEntry , removeFriendRequestEntry , addFriendEntry , removeFriendEntry ,  } = slice.actions;
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (slice.reducer);


/***/ }),

/***/ 4912:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ir": () => (/* binding */ getVideoFrameOpenState),
/* harmony export */   "Iw": () => (/* binding */ setVideoFrameForConversation)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6814);
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(reselect__WEBPACK_IMPORTED_MODULE_1__);


let lastId = 0;
const slice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: 'groups',
    initialState: {
        videoFrameOpen: false
    },
    reducers: {
        setVideoFrameForConversation: (video, action)=>{
            video.videoFrameOpen = action.payload;
        }
    }
});
const getVideoFrameOpenState = (0,reselect__WEBPACK_IMPORTED_MODULE_1__.createSelector)((state)=>state.entities.video
, (video)=>video.videoFrameOpen
);
const { setVideoFrameForConversation  } = slice.actions;
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (slice.reducer);


/***/ }),

/***/ 4513:
/***/ ((module) => {

module.exports = require("@chakra-ui/icons");

/***/ }),

/***/ 8930:
/***/ ((module) => {

module.exports = require("@chakra-ui/react");

/***/ }),

/***/ 5184:
/***/ ((module) => {

module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ 2167:
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ 8941:
/***/ ((module) => {

module.exports = require("form-data");

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

/***/ 5832:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/loadable.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 6358:
/***/ ((module) => {

module.exports = require("react-dropzone");

/***/ }),

/***/ 6022:
/***/ ((module) => {

module.exports = require("react-redux");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 6814:
/***/ ((module) => {

module.exports = require("reselect");

/***/ }),

/***/ 2977:
/***/ ((module) => {

module.exports = require("urql");

/***/ }),

/***/ 9352:
/***/ ((module) => {

module.exports = import("@urql/exchange-graphcache");;

/***/ }),

/***/ 4612:
/***/ ((module) => {

module.exports = import("socket.io-client");;

/***/ }),

/***/ 6555:
/***/ ((module) => {

module.exports = import("uuid");;

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
var __webpack_exports__ = __webpack_require__.X(0, [152,711], () => (__webpack_exec__(150)));
module.exports = __webpack_exports__;

})();