angular.module('GSAPSample.UI', [])
.controller('MainController', ['$timeout', function ($timeout) {
    var self = this;
    self.showPhoto = false;
    self.compositeLoaded = false;

    var contentCompsite = document.getElementById('portfolioContentComposite');
    var content = document.getElementById('portfolioContent');

    content.style.display = "none";
    contentCompsite.style.display = "none";
    TweenMax.set(document.getElementById('photoBtnComposite') , { scaleX: 0, scaleY: 0, transformOrigin: "center", opacity: 0 });
    TweenMax.set(document.getElementById('photoBtn') , { scaleX: 0, scaleY: 0, transformOrigin: "center", opacity: 0 });

    self.init = function () {
        $timeout(function () {

            content.style.display = "block";
            TweenMax.to(content, 0.3, { transformOrigin: "center", opacity: 1 });

            TweenMax.to(document.getElementById('photoBtn'), 0.3, { scaleX: 1, scaleY: 1, transformOrigin: "center", opacity: 1 });

            TweenMax.set($("#foto_anna path"), { attr: { "fill-opacity": 0, "stroke-opacity": 0 } });
            TweenMax.set($("#foto_will path"), { attr: { "fill-opacity": 0, "stroke-opacity": 0 } });

            self.t5 = self.t6 = null;

            self.t1 = new TimelineLite({ paused: true });
            self.t2 = new TimelineLite({ paused: true });
            self.t3 = new TimelineLite({ paused: true });
            self.t4 = new TimelineLite({ paused: true });

            self.t1.to($("#foto_anna"), 0.3, { opacity: 1 });
            self.t1.to($("#foto_will"), 0.3, { opacity: 1 });

            jQuery.each($("#foto_anna path"), function (key, elem) {
                self.t1.add(TweenMax.to(elem, 0.001, { attr: { "stroke-opacity": 1 } }).delay(0.000001 * key));
                self.t2.add(TweenMax.to(elem, 0.001, { attr: { "fill-opacity": 1 } }).delay(0.000001 * key));
                self.t2.add(TweenMax.to(elem, 0.001, { attr: { "stroke-opacity": 0 } }).delay(0.000001 * key));
            });

            jQuery.each($("#foto_will path"), function (key, elem) {
                self.t3.add(TweenMax.to(elem, 0.001, { attr: { "stroke-opacity": 1 } }).delay(0.000001 * key));
                self.t4.add(TweenMax.to(elem, 0.001, { attr: { "fill-opacity": 1 } }).delay(0.000001 * key));
                self.t4.add(TweenMax.to(elem, 0.001, { attr: { "stroke-opacity": 0 } }).delay(0.000001 * key));
            });

            self.loaded = true;
            self.compositeLoaded = false;
        }, 30);
    }
 
    self.initComposite = function () {
        $timeout(function () {
            contentCompsite.style.display = "block";
            TweenMax.to(contentCompsite, 0.3, { transformOrigin: "center", opacity: 1 });

            TweenMax.to(document.getElementById('photoBtnComposite'), 0.3, { scaleX: 1, scaleY: 1, transformOrigin: "center", opacity: 1 }).delay(0.3);

            TweenMax.set($("#foto_composite path"), { attr: { "fill-opacity": 0, "stroke-opacity": 0 } });

            self.t1 = self.t2 = self.t3 = self.t4 = null;

            self.t5 = new TimelineLite({ paused: true });
            self.t6 = new TimelineLite({ paused: true });

            self.t5.to($("#foto_composite"), 0.3, { opacity: 1 });

            jQuery.each($("#foto_composite path"), function (key, elem) {
                self.t5.add(TweenMax.to(elem, 0.001, { attr: { "stroke-opacity": 1 } }).delay(0.000001 * key));
                self.t6.add(TweenMax.to(elem, 0.001, { attr: { "fill-opacity": 1 } }).delay(0.000001 * key));
                self.t6.add(TweenMax.to(elem, 0.001, { attr: { "stroke-opacity": 0 } }).delay(0.000001 * key));
            });

            self.loaded = true;
            self.compositeLoaded = true;
        }, 30);
    }


    self.startShowPhoto = function () {        
        TweenMax.to(document.getElementById('photoBtn'), 0.3, { scaleX: 0, scaleY: 0, transformOrigin: "center", opacity: 0 });
        $timeout(function () {
            self.t1.play();
            self.t1.eventCallback("onComplete", function () {
                self.t2.play();
            });
            self.t2.eventCallback("onComplete", function () {
                self.t3.play();
            });
            self.t3.eventCallback("onComplete", function () {
                self.t4.play();
            });
            self.showPhoto = true;
        }, 300);
    }

    self.startShowPhotoComposite = function () {        
        TweenMax.to(document.getElementById('photoBtnComposite'), 0.3, { scaleX: 0, scaleY: 0, transformOrigin: "center", opacity: 0 });
        $timeout(function () {
            self.t5.play();
            self.t5.eventCallback("onComplete", function () {
                self.t6.play();
            });
            self.showPhoto = true;
        }, 300);
    }

    self.fadeOutCurrentPhoto = function () {
        if (self.compositeLoaded == false) {
            var temp = new TimelineLite({ paused: true });
            temp
                .add(TweenMax.to($("#foto_anna path"), 0.3, { attr: { "fill-opacity": 0, "stroke-opacity": 0 } }))
                .add(TweenMax.to($("#foto_will path"), 0.3, { attr: { "fill-opacity": 0, "stroke-opacity": 0 } }));
            temp.eventCallback("onComplete", function () {
                content.style.display = "none";
                self.initComposite();
                temp = null;
            });
            temp.play();
        }
        else {
            var temp = new TimelineLite({ paused: true });
            temp.add(TweenMax.to($("#foto_composite path"), 0.3, { attr: { "fill-opacity": 0, "stroke-opacity": 0 } }));
            temp.eventCallback("onComplete", function () {
                contentCompsite.style.display = "none";
                self.init();
                temp = null;
            });
            temp.play();
        }
    }


    self.togglePhoto = function () {
        self.showPhoto = false;
        self.fadeOutCurrentPhoto();
        
    }

    self.init();

}]);