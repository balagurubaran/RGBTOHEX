(function() {
    "use strict";
    app.directive("fileDropzone", function() {
        return {
            restrict: "A",
            scope: {
                file: "=",
                fileName: "="
            },
            link: function(a, b, c) {
                var d, e, f, g;
                return f = function(a) {
                    return null != a && a.preventDefault(), a.dataTransfer.effectAllowed = "copy", !1;
                }, g = c.fileDropzone, d = function(a) {
                    var b;
                    return void 0 === (b = c.maxFileSize) || "" === b || a / 1024 / 1024 < c.maxFileSize ? !0 : (alert("File must be smaller than " + c.maxFileSize + " MB"), 
                    !1);
                }, e = function(a) {
                    return void 0 === g || "" === g || g.indexOf(a) > -1 ? !0 : (alert("Invalid file type.  File must be one of following types " + g), 
                    !1);
                }, b.bind("dragover", f), b.bind("dragenter", f), b.bind("drop", function(b) {
                    var c, f, g, h, i;
                    return null != b && b.preventDefault(), g = new FileReader(), g.onload = function(b) {
                        return d(h) && e(i) ? a.$apply(function() {
                            return a.file = b.target.result, angular.isString(a.fileName) ? a.fileName = f : void 0;
                        }) : void 0;
                    }, c = b.dataTransfer.files[0], f = c.name, i = c.type, h = c.size, g.readAsDataURL(c), 
                    !1;
                });
            }
        };
    });
}).call(this);