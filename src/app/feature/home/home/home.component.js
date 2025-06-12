"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeComponent = void 0;
var core_1 = require("@angular/core");
var HomeComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-home',
            standalone: false,
            templateUrl: './home.component.html',
            styleUrl: './home.component.css',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var HomeComponent = _classThis = /** @class */ (function () {
        function HomeComponent_1(http, userService, router, notification) {
            this.http = http;
            this.userService = userService;
            this.router = router;
            this.notification = notification;
            this.posts = [];
            this.caption = '';
            this.isPostFormVisible = false;
            this.visible2 = false;
            this.IsVisible = false;
        }
        HomeComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            console.log('oninit');
            if (!this.userService.user) {
                this.http
                    .get('http://localhost:200/getUser', { withCredentials: true })
                    .subscribe({
                    next: function (res) {
                        _this.userName = res.user.profile.userName;
                        _this.profilePicUrl = res.user.profile.profilePic;
                        _this.profileId = res.user.profile.id;
                        // console.log(this.profileId);
                        _this.userService.user = res.user;
                        _this.posts = res.user.post;
                        _this.postLength = _this.posts.length;
                        _this.profilePicUrl =
                            'assets/' + _this.userService.user.profile.profilePic;
                        // console.log("whts is thisss",this.userService.user);
                        // console.log(this.profileId);
                        _this.profileId = _this.userService.user.profile.id;
                        // console.log(this.posts[0].like[0].user);
                        // console.log(this.posts[0].imgUrl);
                        _this.posts.forEach(function (post) {
                            // console.log(post.like.length);
                            _this.likeCount = post.like.length;
                            post.like.forEach(function (obj) {
                                console.log(obj.user);
                                // console.log(this.userService.user.userId);
                                if (obj.user.userId == _this.userService.user.userId) {
                                    _this.liked = true;
                                    // console.log(true);
                                }
                                else {
                                    _this.liked = false;
                                }
                            });
                        });
                    },
                    error: function (res) {
                        // console.log('hii');
                        _this.router.navigate(['/']);
                    },
                });
                // console.log('helloo',this.userService.user);
            }
            else {
                this.profileId = this.userService.user.profile.id;
                console.log(this.profileId);
                this.profilePicUrl = 'assets/' + this.userService.user.profile.profilePic;
                this.userName = this.userService.user.profile.userName;
                this.posts = this.userService.user.post;
            }
            console.log(this.posts);
            this.postLength = this.posts.length;
            this.posts.forEach(function (post) {
                console.log(post);
                _this.likeCount = post.like.length;
                post.like.forEach(function (obj) {
                    console.log(_this.userService.user.userId);
                    if (obj.user.userId == _this.userService.user.userId) {
                        _this.liked = true;
                    }
                });
            });
        };
        HomeComponent_1.prototype.togglePostForm = function () {
            this.isPostFormVisible = !this.isPostFormVisible;
            console.log(this.isPostFormVisible);
        };
        HomeComponent_1.prototype.onChange = function (event) {
            if (event.target.files.length > 0) {
                this.file = event.target.files[0];
            }
        };
        HomeComponent_1.prototype.addPost = function () {
            var _this = this;
            this.isPostFormVisible = !this.isPostFormVisible;
            var formdata = new FormData();
            formdata.append('file', this.file);
            formdata.append('caption', this.caption);
            if (this.file || this.caption) {
                this.http
                    .post('http://localhost:200/addPost', formdata, {
                    withCredentials: true,
                })
                    .subscribe({
                    next: function (res) {
                        alert(res.msg);
                        _this.http
                            .get('http://localhost:200/getPost', { withCredentials: true })
                            .subscribe({
                            next: function (res) {
                                console.log(res.posts);
                                _this.posts = res.posts;
                                console.log(res.posts[0].caption);
                                _this.userName = res.posts[0].userName;
                                _this.posts.forEach(function (post) {
                                    post.like.LikedBy.forEach(function (obj) {
                                        if (obj.userId == _this.userService.user[0].userId) {
                                            post.like.isLiked = true;
                                        }
                                    });
                                });
                            },
                        });
                    },
                });
            }
            else {
                alert('empty');
            }
        };
        HomeComponent_1.prototype.openNotification = function () {
            var _this = this;
            console.log('noti');
            console.log(this.profileId);
            this.notification.getNotification(this.profileId).subscribe({
                next: function (res) {
                    console.log(_this.profileId);
                    console.log(res);
                    _this.notifications = res;
                },
            });
            this.visible2 = !this.visible2;
        };
        HomeComponent_1.prototype.deleteComponent = function (postId) {
            console.log('delet called');
            this.posts = this.posts.filter(function (post) {
                console.log(postId);
                console.log(post.PostId);
                return post.PostId != postId;
            });
            console.log(this.posts);
        };
        HomeComponent_1.prototype.added = function () {
            var _this = this;
            this.http
                .get('http://localhost:200/getPost', { withCredentials: true })
                .subscribe({
                next: function (res) {
                    console.log(res.posts);
                    _this.posts = res.posts;
                    console.log(res.posts[0].caption);
                    _this.userName = res.posts[0].userName;
                },
            });
        };
        return HomeComponent_1;
    }());
    __setFunctionName(_classThis, "HomeComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HomeComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HomeComponent = _classThis;
}();
exports.HomeComponent = HomeComponent;
// @ViewChild('container',{read:ViewContainerRef})
// vcr ?: ViewContainerRef;
// #component?:ComponentRef<any>
// updateLikes(id: number, liked: boolean, likes: number) {
//   const updates: any = {
//     postId: id,
//     updatedLiked: liked,
//     updatedLikes: likes
//   }
//   this.http.patch('http://localhost:200/updateLike', updates, { withCredentials: true }).subscribe(
//     {
//       next: (res: any) => {
//         this.likes = res.like
//       }
//     }
//   )
// }
