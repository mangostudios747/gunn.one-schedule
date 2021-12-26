"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.getSectionAnnouncement = exports.getAllGrades = exports.getPage = exports.getDocument = exports.like = exports.fetchCourseUpdates = exports.fetchRecentUpdates = exports.getUpdate = exports.fetchFileDetails = exports.fetchExternalToolDetails = exports.fetchLinkDetails = exports.fetchAllSectionEventsForWeek = exports.fetchWeekUserEvents = exports.getSection = exports.getSectionFolder = exports.newMessage = exports.replyToMessage = exports.fetchSentMessage = exports.fetchInboxMessage = exports.fetchMessagesSent = exports.fetchMessagesInbox = exports.getPendingAssignmentsForSection = exports.getAssignmentsForSection = exports.reloadAssignmentsForSection = exports.fetchAssignmentsForSection = exports.getSections = exports.reloadSections = exports.fetchSections = exports.getProfileFor = exports.getProfile = void 0;
var oauth = require('./oauth');
var mdb = require('../database').mdb;
var userDatamdb; // todo: get access to types
mdb.then(function (c) {
    userDatamdb = c.db('users').collection('profiles');
});
var sgyDomain = 'https://pausd.schoology.com';
var apiBase = 'https://api.schoology.com/v1';
var usersCache = {};
var updatesCache = {};
function getNextDayOfWeek(date, dayOfWeek) {
    // Code to check that date and dayOfWeek are valid left as an exercise ;)
    if (dayOfWeek === void 0) { dayOfWeek = 5; }
    var resultDate = new Date(date.getTime());
    resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
    return resultDate;
}
function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(), diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}
function dateToString(date) {
    return (function (_a) {
        var a = _a[0], b = _a[1], c = _a[2];
        return ([a, b, +c - 1].join('-'));
    })(date.toISOString().split('T')[0].split('-'));
}
function flattenArray(arr) {
    var result = [];
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var sub = arr_1[_i];
        result.push.apply(result, sub);
    }
    return result;
}
function toJson(_a) {
    var data = _a[0];
    return JSON.parse(data);
}
// node-oauth only follows 301 and 302 HTTP statuses, but Schoology redirects
// /users/me with a 303 status >_<
function follow303(err) {
    if (err.statusCode === 303) {
        var _a = err.out, request = _a[1];
        //console.log(request.headers.location)
        return oauth.get.apply(oauth, __spreadArrays([request.headers.location], err.args.slice(1)));
    }
    else {
        return Promise.reject(err);
    }
}
/*export async function getFrom(path, creds){
    return await (oauth.get(`${apiBase}${!path.startsWith('/')? '/':''}${path}`, creds.token, creds.tokenSecret)
        .catch(follow303)
        .then(toJson))
}*/
function getFrom(path, creds, method, body) {
    if (method === void 0) { method = 'get'; }
    if (body === void 0) { body = null; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(method === 'get')) return [3 /*break*/, 2];
                    return [4 /*yield*/, (oauth[method]("" + apiBase + (!path.startsWith('/') ? '/' : '') + path, creds.token, creds.tokenSecret)["catch"](follow303)
                            .then(toJson))["catch"](console.error)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2: return [4 /*yield*/, (oauth[method]("" + apiBase + (!path.startsWith('/') ? '/' : '') + path, creds.token, creds.tokenSecret, body, 'application/json')
                        .then(toJson))["catch"](console.error)];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getProfile(creds) {
    return __awaiter(this, void 0, void 0, function () {
        var value;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getFrom('users/me', creds)];
                case 1:
                    value = _a.sent();
                    usersCache[value.uid] = value;
                    return [2 /*return*/, value];
            }
        });
    });
}
exports.getProfile = getProfile;
function getProfileFor(creds, uid) {
    return __awaiter(this, void 0, void 0, function () {
        var returnValue;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (usersCache[uid])
                        return [2 /*return*/, usersCache[uid]];
                    return [4 /*yield*/, getFrom('users/' + uid, creds)];
                case 1:
                    returnValue = _a.sent();
                    usersCache[uid] = returnValue;
                    return [2 /*return*/, returnValue];
            }
        });
    });
}
exports.getProfileFor = getProfileFor;
function fetchSections(user) {
    return __awaiter(this, void 0, void 0, function () {
        var apiResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getFrom("/users/" + user.profile.uid + "/sections", user.credentials)];
                case 1:
                    apiResult = _a.sent();
                    return [2 /*return*/, apiResult.section.sort(function (section1, section2) {
                            return (+section1.section_title.split(' ')[0] || Infinity) - (+section2.section_title.split(' ')[0] || Infinity);
                        })]; // an array of sections loll
            }
        });
    });
}
exports.fetchSections = fetchSections;
function reloadSections(user) {
    return __awaiter(this, void 0, void 0, function () {
        var sections;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchSections(user)
                    // put them in the database
                    //userDatadb.set(`${user.profile.uid}.sections`, sections).write()
                ];
                case 1:
                    sections = _a.sent();
                    // put them in the database
                    //userDatadb.set(`${user.profile.uid}.sections`, sections).write()
                    return [4 /*yield*/, userDatamdb.updateOne({ _id: +user.profile.uid }, {
                            $set: {
                                sections: sections
                            }
                        }, { upsert: true })];
                case 2:
                    // put them in the database
                    //userDatadb.set(`${user.profile.uid}.sections`, sections).write()
                    _a.sent();
                    return [2 /*return*/, sections];
            }
        });
    });
}
exports.reloadSections = reloadSections;
function getSections(user) {
    return __awaiter(this, void 0, void 0, function () {
        var sections;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userDatamdb.findOne({ _id: +user.profile.uid })];
                case 1:
                    sections = ((_a.sent()) || {}).sections;
                    if (!!sections) return [3 /*break*/, 3];
                    return [4 /*yield*/, reloadSections(user)];
                case 2:
                    // we hath not loaded the sections! ever!
                    sections = _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/, sections];
            }
        });
    });
}
exports.getSections = getSections;
function fetchAssignmentsForSection(sectionId, creds) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getFrom("/sections/" + sectionId + "/assignments", creds)];
                case 1: 
                // get the assignments from a specific course!
                return [2 /*return*/, (_a.sent()).assignment];
            }
        });
    });
}
exports.fetchAssignmentsForSection = fetchAssignmentsForSection;
function reloadAssignmentsForSection(user, sectionId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAssignmentsForSection(sectionId, user.credentials)];
                case 1: 
                // put them in the database
                /*for (let index in asg) {
                  userDatadb.set(`${user.profile.uid}.assignments.${sectionId}.${index}`, asg[index]).write();
                }*/
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.reloadAssignmentsForSection = reloadAssignmentsForSection;
function getAssignmentsForSection(user, sectionId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, reloadAssignmentsForSection(user, sectionId)];
                case 1: 
                // we only need the uid hmm
                //let data = null//userDatadb.get(`${user.profile.uid}.assignments.${sectionId}`).value();
                // we hath not loaded the data! ever!
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getAssignmentsForSection = getAssignmentsForSection;
function getPendingAssignmentsForSection(user, sectionId) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAssignmentsForSection(user, sectionId)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data.filter(function (assignment) {
                            return !!(assignment.available && !assignment.completed);
                        })];
            }
        });
    });
}
exports.getPendingAssignmentsForSection = getPendingAssignmentsForSection;
function fetchMessagesInbox(user) {
    return __awaiter(this, void 0, void 0, function () {
        var messages, _a, _b, _i, index, author_id, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, getFrom('/messages/inbox', user.credentials)];
                case 1:
                    messages = (_e.sent()).message;
                    _a = [];
                    for (_b in messages)
                        _a.push(_b);
                    _i = 0;
                    _e.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 5];
                    index = _a[_i];
                    author_id = messages[index].author_id;
                    console.log(messages[index].id);
                    //messages[index]['recipient'] = await getProfileFor(user.credentials, recipient_ids);
                    _c = messages[index];
                    _d = 'author';
                    return [4 /*yield*/, getProfileFor(user.credentials, author_id)];
                case 3:
                    //messages[index]['recipient'] = await getProfileFor(user.credentials, recipient_ids);
                    _c[_d] = _e.sent();
                    _e.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, messages];
            }
        });
    });
}
exports.fetchMessagesInbox = fetchMessagesInbox;
function fetchMessagesSent(user, page) {
    if (page === void 0) { page = 1; }
    return __awaiter(this, void 0, void 0, function () {
        var _a, messages, unreadCount, _b, _c, _i, index, recipient_ids, rids, _d, rids_1, rid, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [4 /*yield*/, getFrom("/messages/sent?start=" + 20 * (page - 1) + "&limit=" + page * 20, user.credentials)];
                case 1:
                    _a = (_g.sent()), messages = _a.message, unreadCount = _a.unreadCount;
                    _b = [];
                    for (_c in messages)
                        _b.push(_c);
                    _i = 0;
                    _g.label = 2;
                case 2:
                    if (!(_i < _b.length)) return [3 /*break*/, 7];
                    index = _b[_i];
                    recipient_ids = messages[index].recipient_ids;
                    rids = recipient_ids.split(',');
                    messages[index]['recipients'] = [];
                    _d = 0, rids_1 = rids;
                    _g.label = 3;
                case 3:
                    if (!(_d < rids_1.length)) return [3 /*break*/, 6];
                    rid = rids_1[_d];
                    _f = (_e = messages[index]['recipients']).push;
                    return [4 /*yield*/, getProfileFor(user.credentials, rid)];
                case 4:
                    _f.apply(_e, [_g.sent()]);
                    _g.label = 5;
                case 5:
                    _d++;
                    return [3 /*break*/, 3];
                case 6:
                    _i++;
                    return [3 /*break*/, 2];
                case 7: return [2 /*return*/, messages];
            }
        });
    });
}
exports.fetchMessagesSent = fetchMessagesSent;
function fetchInboxMessage(user, messageId) {
    return __awaiter(this, void 0, void 0, function () {
        var message, _a, _b, _i, index, _c, recipient_ids, author_id, _d, _e, rids, _f, rids_2, rid, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0: return [4 /*yield*/, getFrom("/messages/inbox/" + messageId, user.credentials)];
                case 1:
                    message = (_j.sent()).message;
                    _a = [];
                    for (_b in message)
                        _a.push(_b);
                    _i = 0;
                    _j.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 8];
                    index = _a[_i];
                    _c = message[index], recipient_ids = _c.recipient_ids, author_id = _c.author_id;
                    _d = message[index];
                    _e = 'author';
                    return [4 /*yield*/, getProfileFor(user.credentials, author_id)];
                case 3:
                    _d[_e] = _j.sent();
                    message[index]['recipients'] = [];
                    rids = recipient_ids.split(',');
                    _f = 0, rids_2 = rids;
                    _j.label = 4;
                case 4:
                    if (!(_f < rids_2.length)) return [3 /*break*/, 7];
                    rid = rids_2[_f];
                    _h = (_g = message[index]['recipients']).push;
                    return [4 /*yield*/, getProfileFor(user.credentials, rid)];
                case 5:
                    _h.apply(_g, [_j.sent()]);
                    _j.label = 6;
                case 6:
                    _f++;
                    return [3 /*break*/, 4];
                case 7:
                    _i++;
                    return [3 /*break*/, 2];
                case 8: return [2 /*return*/, message];
            }
        });
    });
}
exports.fetchInboxMessage = fetchInboxMessage;
function fetchSentMessage(user, messageId) {
    return __awaiter(this, void 0, void 0, function () {
        var message, _a, _b, _i, index, _c, recipient_ids, author_id, _d, _e, rids, _f, rids_3, rid, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0: return [4 /*yield*/, getFrom("/messages/sent/" + messageId, user.credentials)];
                case 1:
                    message = (_j.sent()).message;
                    _a = [];
                    for (_b in message)
                        _a.push(_b);
                    _i = 0;
                    _j.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 8];
                    index = _a[_i];
                    _c = message[index], recipient_ids = _c.recipient_ids, author_id = _c.author_id;
                    _d = message[index];
                    _e = 'author';
                    return [4 /*yield*/, getProfileFor(user.credentials, author_id)];
                case 3:
                    _d[_e] = _j.sent();
                    message[index]['recipients'] = [];
                    rids = recipient_ids.split(',');
                    _f = 0, rids_3 = rids;
                    _j.label = 4;
                case 4:
                    if (!(_f < rids_3.length)) return [3 /*break*/, 7];
                    rid = rids_3[_f];
                    _h = (_g = message[index]['recipients']).push;
                    return [4 /*yield*/, getProfileFor(user.credentials, rid)];
                case 5:
                    _h.apply(_g, [_j.sent()]);
                    _j.label = 6;
                case 6:
                    _f++;
                    return [3 /*break*/, 4];
                case 7:
                    _i++;
                    return [3 /*break*/, 2];
                case 8: return [2 /*return*/, message];
            }
        });
    });
}
exports.fetchSentMessage = fetchSentMessage;
function replyToMessage(user, messageId, datums) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getFrom("/messages/" + messageId, user.credentials, 'post', JSON.stringify(datums))
                    // the client should now reload the messages.
                ];
                case 1: 
                // datums should have {recipient_ids, subject, message}
                return [2 /*return*/, _a.sent()
                    // the client should now reload the messages.
                ];
            }
        });
    });
}
exports.replyToMessage = replyToMessage;
function newMessage(user, datums) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getFrom("/messages", user.credentials, 'post', JSON.stringify(datums))];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.newMessage = newMessage;
function getSectionFolder(user, sectionid, folderid) {
    if (folderid === void 0) { folderid = 0; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getFrom("/courses/" + sectionid + "/folder/" + folderid + "?with_attachments=1", user.credentials)
                        .then(function (e) { return e['folder-item'] ? e['folder-item'].map(function (k) { return (__assign(__assign({}, k), { name: k.title, children: k.type === 'folder' ? [] : undefined })); }) : []; })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getSectionFolder = getSectionFolder;
function getSection(user, sectionid) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getFrom("/sections/" + sectionid + "/", user.credentials)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getSection = getSection;
function fetchWeekUserEvents(user) {
    return __awaiter(this, void 0, void 0, function () {
        var base, today, friday;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    base = new Date;
                    today = dateToString(base);
                    friday = dateToString(getNextDayOfWeek(base));
                    return [4 /*yield*/, getFrom("/users/" + user.profile.uid + "/events?start_date=" + today + "&end_date=" + friday, user.credentials)];
                case 1: return [2 /*return*/, (_a.sent())
                        .event
                        .map(function (event) {
                        if (!event.has_end) {
                            event.end = event.start;
                        }
                        event.color = {
                            event: 'green darken-2',
                            assignment: 'primary',
                            discussion: 'accent'
                        }[event.type] || 'purple darken-1';
                        //console.log(event.type)
                        event.timed = !event.all_day;
                        event.name = event.title;
                        event.links = undefined;
                        return event;
                    })];
            }
        });
    });
}
exports.fetchWeekUserEvents = fetchWeekUserEvents;
function fetchAllSectionEventsForWeek(user) {
    return __awaiter(this, void 0, void 0, function () {
        var start, end, monday, friday, sections, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    start = new Date;
                    end = new Date;
                    start.setDate(0);
                    end.setMonth((start.getMonth() + 1) % 12);
                    end.setDate(0);
                    monday = dateToString(start);
                    friday = dateToString(end);
                    return [4 /*yield*/, getSections(user)];
                case 1:
                    sections = (_b.sent())
                        .map(function (a) { return a.id; })
                        .map(function (a) { return "/v1/sections/" + a + "/events?start_date=" + monday + "&end_date=" + friday; });
                    _a = flattenArray;
                    return [4 /*yield*/, getFrom("/multiget", user.credentials, 'post', JSON.stringify({
                            request: sections
                        }))];
                case 2: 
                //console.log(sections)
                return [2 /*return*/, _a.apply(void 0, [(_b.sent())
                            .response
                            .map(function (a) { return a.body.event; })])
                        .map(function (event) {
                        if (!event.has_end) {
                            event.end = event.start;
                        }
                        // @ts-ignore
                        event.color = {
                            event: 'grey',
                            assignment: 'primary',
                            discussion: 'yellow',
                            external_tool: 'accent'
                        }[event.type] || 'purple darken-1';
                        //console.log(event.type)
                        event.timed = !event.all_day;
                        event.name = event.title;
                        event.links = undefined;
                        return event;
                    })];
            }
        });
    });
}
exports.fetchAllSectionEventsForWeek = fetchAllSectionEventsForWeek;
function fetchLinkDetails(user, sectionid, documentid) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getFrom("/sections/" + sectionid + "/documents/" + documentid, user.credentials)
                        .then(function (e) { return e.attachments.links.link[0]; })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.fetchLinkDetails = fetchLinkDetails;
function fetchExternalToolDetails(user, sectionid, documentid) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getFrom("/sections/" + sectionid + "/documents/" + documentid, user.credentials)
                        .then(function (e) { return e.attachments.external_tools.external_tool[0]; })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.fetchExternalToolDetails = fetchExternalToolDetails;
function fetchFileDetails(user, sectionid, documentid) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getFrom("/sections/" + sectionid + "/documents/" + documentid, user.credentials)
                        .then(function (e) { return e.attachments.files.file[0]; })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.fetchFileDetails = fetchFileDetails;
function getUpdate(user, updateid) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getFrom("/users/" + user.profile.uid + "/updates/" + updateid + "?with_attachments=true", user.credentials)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getUpdate = getUpdate;
function fetchRecentUpdates(user) {
    return __awaiter(this, void 0, void 0, function () {
        var updates, _i, updates_1, update, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getFrom("/recent?limit=50?with_attachments=true", user.credentials)
                        .then(function (e) { return e.update; })];
                case 1:
                    updates = _b.sent();
                    _i = 0, updates_1 = updates;
                    _b.label = 2;
                case 2:
                    if (!(_i < updates_1.length)) return [3 /*break*/, 5];
                    update = updates_1[_i];
                    _a = update;
                    return [4 /*yield*/, getProfileFor(user.credentials, update.uid)
                        //Object.assign(update, await getUpdate(user, update.id))
                    ];
                case 3:
                    _a.author = _b.sent();
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, updates];
            }
        });
    });
}
exports.fetchRecentUpdates = fetchRecentUpdates;
function fetchCourseUpdates(user, courseid) {
    return __awaiter(this, void 0, void 0, function () {
        var updates, _i, updates_2, update, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getFrom("/sections/" + courseid + "/updates?limit=50&with_attachments=true", user.credentials)
                        .then(function (e) { return e.update; })];
                case 1:
                    updates = _b.sent();
                    _i = 0, updates_2 = updates;
                    _b.label = 2;
                case 2:
                    if (!(_i < updates_2.length)) return [3 /*break*/, 5];
                    update = updates_2[_i];
                    _a = update;
                    return [4 /*yield*/, getProfileFor(user.credentials, update.uid)
                        //Object.assign(update, await getUpdate(user, update.id))
                    ];
                case 3:
                    _a.author = _b.sent();
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, updates];
            }
        });
    });
}
exports.fetchCourseUpdates = fetchCourseUpdates;
// like an update - ACTION
function like(user, updateid, like_action) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getFrom("/like/" + updateid, user.credentials, 'post', JSON.stringify({
                        like_action: like_action
                    }))];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.like = like;
// works for documents, links, etc
function getDocument(user, sectionid, documentid) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getFrom("sections/" + sectionid + "/documents/" + documentid, user.credentials)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getDocument = getDocument;
// the raw stuff
function getPage(user, sectionid, pageid) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getFrom("sections/" + sectionid + "/pages/" + pageid, user.credentials)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getPage = getPage;
function getSectionAssignments(user, sectionid) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getFrom("sections/" + sectionid + "/assignments", user.credentials)
                        .then(function (e) { return (e.assignment); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getSectionGrades(user, sectionid) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getFrom("/users/" + user.profile.uid + "/grades?section_id=" + sectionid, user.credentials)
                        .then(function (e) { return e.section; })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function sortedSectionGrades(user, sectionid) {
    return __awaiter(this, void 0, void 0, function () {
        var g, a, categories, grades, assignments, _loop_1, _i, assignments_1, as;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSectionGrades(user, sectionid)];
                case 1:
                    g = (_a.sent())[0];
                    return [4 /*yield*/, getSectionAssignments(user, sectionid)];
                case 2:
                    a = _a.sent();
                    if (!g)
                        return [2 /*return*/, undefined
                            // a is a reference, g is the thing we need to transform
                        ];
                    categories = {};
                    g.grading_category.forEach(function (c) {
                        c.assignments = [];
                        categories[c.id] = c;
                    });
                    grades = g.final_grade.find(function (e) { return e.weight; });
                    grades.grading_category.forEach(function (c) { return Object.assign(categories[c.category_id], c); });
                    assignments = g.period.find(function (e) { return e.period_id === grades.period_id; }).assignment;
                    _loop_1 = function (as) {
                        var asg_info = a.find(function (e) { return e.id === as.assignment_id; });
                        if (asg_info) {
                            Object.assign(as, asg_info);
                        }
                        categories[as.category_id].assignments.push(as);
                    };
                    for (_i = 0, assignments_1 = assignments; _i < assignments_1.length; _i++) {
                        as = assignments_1[_i];
                        _loop_1(as);
                    }
                    grades.categories = categories;
                    return [2 /*return*/, grades];
            }
        });
    });
}
function getAllGrades(user) {
    return __awaiter(this, void 0, void 0, function () {
        var sectionids, grades, _i, sectionids_1, sectionid, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, getSections(user)];
                case 1:
                    sectionids = (_c.sent()).map(function (section) { return section.id; });
                    grades = {};
                    _i = 0, sectionids_1 = sectionids;
                    _c.label = 2;
                case 2:
                    if (!(_i < sectionids_1.length)) return [3 /*break*/, 5];
                    sectionid = sectionids_1[_i];
                    _a = grades;
                    _b = sectionid;
                    return [4 /*yield*/, sortedSectionGrades(user, sectionid)];
                case 3:
                    _a[_b] = _c.sent();
                    _c.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, grades];
            }
        });
    });
}
exports.getAllGrades = getAllGrades;
function getSectionAnnouncement(user, sectionid) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getFrom("sections/" + sectionid + "/updates", user.credentials)
                        .then(function (e) { return e.update.sort(function (a, b) { return b.last_updated - a.last_updated; })[0]; })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getSectionAnnouncement = getSectionAnnouncement;
