exports.ids=[1],exports.modules={116:function(t,e){},117:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAAXNSR0IArs4c6QAAA8xJREFUWAntlktIVFEYx50ZHxm+oNqMFTgKQxG18DUi9tJCkVypmyAQhNq16QFBi0BIWgUu27ToAVmClBRkKplKPsBoY1SMGalkTxhsdJyx3zfdM9zGO3fmjkEFHrjznfs9/ud/vu8790xKysb4gxlYXV21FRcXXy0pKemQ+Xqgkw5uampyeL3eaxBo0Qhcd7lcrZ2dncFkCCVFBBLpkLgJicaoRTt5Pz4xMRGI0sd9tUykoqIiMxAIdEGiNgZ6T3Z2duPAwIA/ht1QbYlIeXl5zsrKygOQqhSa3W5vg5Sd54LSIfsh0wAZn05nOnWYWnVGmnJrKBR6jMqj1Dab7dz4+Hjb7Oxsn9PpXEJfo9kKlpeXD7vd7nvT09MJZSYhIpWVlU4y0c8ie7WFQmTiFCQ6tPeUubm5Z/n5+Z95r+ORTG+nhLWFhYVdMzMzi8ovloxbmtLSUhdp7+UpEBCysII4AYnbRqD4t+Arp0ltcio9Pb1mZGTkg5G/0pkSoSd2kwkph1MCIOHnaR4bG7uvAIwkZJop4w1saWInxksGq0dHR71G/mGfWIaysrISwB6xsy2ajzReA0dTShR30FP1ELhL/CbNWTJSQ/yUUbDdSMmO9kPiiY7EVw0kIRKCyYI9ZKGeqTo5+cyfssF9Yo8ea4jwua6DgGQiR5zZ1TziAMDPo4PjvVOKPofDcRS/b5rvtmAwOEDJIydPYfxGhHQ2QaCbJ1NzeJeWllYFiZcqwKqEzAiZOUTcghabJ33Hhg/qsSLNimEPBF5gDJMjE694jtCY7/UByc49Hs8ujnMv8eHGRy5mZGQUDA8PfxTMSEZYVGqnSEzyfhJiHfTLGXFczxAMsnCZvmsFV52czejcCjeSEblD+BpeFAOf5ys+n+8WROTjJKOI8rz9NbX2C24RuK8lChIPyUKr3+8/T7nmKVs7ulWxpcqPDD44PxCR+4JS5YYN/KSmpuapuVVJFiI4xOYODQ3NIk8LDiREhEekNErxt2QkI1YIcLoKOZZZRjEcT18yZbScEUrWBoE3LDhp9IhN8zHiGVNnmQgNfCwmmmZIxCcaw3JpaDAHCymcGSYB7UUuuJ0yFx9Nl7CwnBE9Mtd7Nf0gR7tI5nqb1fm6iFhdzMz/nyGSUI/wKa7hyLq0HYVvZbPdYcuRC1R8iFVxpiEJEQGhXaHoGlWp1kh8dqC8s8ZgoohZGsC+mMSJKcQdov5nyDXwXXRmMWaYZhk5yzH0EZwVfRzRLXFpdfMX4ZNaeHBwcIFbtpW7pQH/DKUXiX9Qw7qk12/M/4sM/ATBJJ2M0qZVggAAAABJRU5ErkJggg=="},119:function(t,e,n){"use strict";n.r(e),n.d(e,"default",function(){return l});var o=n(0),r=n.n(o);function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function c(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function u(t,e){return!e||"object"!==i(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}n(116);var f=n(117),l=function(t){function e(){var t;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(t=u(this,a(e).apply(this,arguments))).state={count:0},t.count=function(){t.setState({count:++t.state.count})},t}var n,o;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}(e,r.a.Component),n=e,(o=[{key:"render",value:function(){return r.a.createElement("div",{className:"home"},r.a.createElement("div",null,"It's React SSR"),r.a.createElement("button",{style:{display:"inline-block",width:"100px",height:"60px",border:"none",marginRight:"20px"},onClick:this.count},"Click to Add: ",this.state.count),r.a.createElement("div",{className:"home-background"}),r.a.createElement("img",{src:f,alt:"icon-home"}))}}])&&c(n.prototype,o),e}()}};