"use strict";(self.webpackChunkchat=self.webpackChunkchat||[]).push([[660],{46658:function(n,t,i){i(72791);t.Z=i.p+"static/media/rate.9188c89ba07c8dbf28dc6178678670b2.svg"},65796:function(n,t,i){i.d(t,{Z:function(){return h}});var o=i(70885),e=i(697),r=i(36314),a=i(82880),c=i(39709),l=i(72791),d=i(13967),s=(i(10155),i(85670),i(86026)),u=i(59434),f=(i.p,i(67394)),g=i(57689),p=i(53329),v=i(80184),h=function(n){var t=n.type,i=(0,u.I0)(),h=(0,g.s0)(),x=(0,d.Z)(),m=(0,u.v9)((function(n){return n.app})),w=m.isRating,Z=m.identify,y=(m.history,m.isEnd),b=(0,l.useState)(""),j=(0,o.Z)(b,2),I=j[0],A=j[1];function k(){w||(window.isRating=!0,i((0,s._Q)({history:[]})),i((0,s._3)({isRating:!0})),window.ws&&window.ws.send(JSON.stringify({cmd:"score"})))}return(0,l.useEffect)((function(){if("chat"!==Z){var n=Date.now()+9e5,t=setInterval((function(){var i=Date.now();if(i>=n)return A("00:00"),clearInterval(t),void k();var o=Math.floor((n-i)/1e3),e=o%60,r=(o-e)/60;e=e<10?"0"+e:e,A("".concat(r=r<10?"0"+r:r,":").concat(e))}),1e3);return function(){t&&clearInterval(t)}}}),[]),(0,v.jsxs)(e.Z,{p:2,sx:{width:"100%",height:"74px",backgroundColor:"light"===x.palette.mode?"#F8FAFF":x.palette.background.paper,boxShadow:"0px 0px 2px rgba(0,0,0,0.25)"},children:[(0,v.jsx)(r.Z,{alignItems:"center",direction:"row",justifyContent:"space-between",sx:{width:"100%",height:"100%"},children:(0,v.jsxs)(r.Z,{sx:{width:"100%"},onClick:function(){i((0,s.Xk)())},direction:"row",justifyContent:"space-between",spacing:2,children:[(0,v.jsx)(f.Z,{onClick:function(){var n,t;window.player&&(null===(n=window.player)||void 0===n||null===(t=n.pause)||void 0===t||t.call(n),window.isPlaying=!1),i((0,s._Q)({history:[]})),i((0,s._3)({isRating:!1})),i((0,s.Vs)({score:[]})),h("/index")}}),"score"===t?null:(0,v.jsxs)("div",{style:{display:"flex",flexDirection:"row",alignItems:"center",columnGap:"18px"},children:["chat"!==Z?(0,v.jsx)("div",{children:I}):null,"chat"!==Z?w?(0,v.jsx)(c.Z,{endIcon:(0,v.jsx)(p.Z,{}),loading:!0,loadingPosition:"end",variant:"contained",children:(0,v.jsx)("span",{children:"\u8bc4\u5206\u4e2d"})}):(0,v.jsx)(a.Z,{variant:"contained",onClick:k,color:"success",style:{backgroundColor:"#39b213",color:"#FFF"},children:"\u7ed3\u675f\u5e76\u8bc4\u5206"}):null]})]})}),y?(0,v.jsx)("div",{style:{position:"fixed",zIndex:1e4,top:0,left:0,width:"100vw",height:"100vh",background:"rgba(0, 0, 0, 0.5)",display:"flex",justifyContent:"center",alignItems:"center"},children:(0,v.jsxs)("div",{style:{borderRadius:"10px",background:"#fff",padding:"16px 24px",width:"80%",display:"flex",flexDirection:"column"},children:[(0,v.jsx)("div",{style:{fontSize:"18px",color:"#212B36",fontWeight:700},children:"\u63d0\u793a"}),(0,v.jsx)("div",{style:{fontSize:"16px",color:"#637381",marginTop:"12px"},children:"\u8003\u8bd5\u5df2\u7ed3\u675f"}),(0,v.jsx)("div",{style:{color:"#0162C4",fontSize:"14px",cursor:"pointer",marginTop:"24px",width:"fit-content",alignSelf:"flex-end"},onClick:function(){k(),i((0,s.fw)({isEnd:!1}))},children:"\u786e\u5b9a"})]})}):null]})}},85670:function(n,t,i){var o=i(50225),e=i(29472),r=(0,o.Z)(e.Z)((function(n){var t=n.theme;return{"& .MuiBadge-badge":{backgroundColor:"#44b700",color:"#44b700",boxShadow:"0 0 0 2px ".concat(t.palette.background.paper),"&::after":{position:"absolute",top:0,left:0,width:"100%",height:"100%",borderRadius:"50%",animation:"ripple 1.2s infinite ease-in-out",border:"1px solid currentColor",content:'""'}},"@keyframes ripple":{"0%":{transform:"scale(.8)",opacity:1},"100%":{transform:"scale(2.4)",opacity:0}}}}));t.Z=r},86731:function(n,t,i){i.d(t,{Z:function(){return a}});var o=i(70885),e=i(72791),r=i(80184);function a(n){var t=n.originalText,i=(0,e.useState)(""),a=(0,o.Z)(i,2),c=a[0],l=a[1];return(0,e.useEffect)((function(){var n=0;c&&(n=c.length);var i=n,o=setInterval((function(){i<=t.length-1?(l(c+t.slice(n,i+1)),i++):clearInterval(o)}),200);return function(){clearInterval(o)}}),[t]),(0,r.jsx)("span",{style:{whiteSpace:"pre-line"},children:c})}},29878:function(n,t,i){i.r(t),i.d(t,{default:function(){return s}});var o=i(70885),e=i(72791),r=i(59434),a=(i(46658),i.p+"static/media/course.ecde2249da7f1775a1a0.mp4");i.p;i.p,i.p,i(86731);var c=i(65796),l=i(45234),d=i(80184);function s(){var n=(0,r.v9)((function(n){return n.app})),t=n.history,i=(n.identify,n.score),s=(0,e.useState)(),u=(0,o.Z)(s,2),f=u[0],g=u[1],p=(0,e.useRef)(),v=((0,e.useMemo)((function(){var n=null===t||void 0===t?void 0:t[t.length-1];return null!==n&&void 0!==n&&n.isShow?null===n||void 0===n?void 0:n.content:""}),[t]),(0,e.useMemo)((function(){if(!i.length)return null;var n=i.filter((function(n){return"\u603b\u5206"!==n.score_name}));return{title:{show:!1},tooltip:{},legend:{show:!1},label:{show:!0},radar:{indicator:n.map((function(n){return{name:n.score_name,max:100}})),radius:"50%"},series:[{type:"radar",data:[{value:n.map((function(n){return Number(n.score)}))}]}]}}),[i])),h=(0,e.useMemo)((function(){return i.length?i.filter((function(n){return"\u603b\u5206"!==n.score_name})):[]}),[i]),x=(0,e.useMemo)((function(){return i.length?i.find((function(n){return"\u603b\u5206"===n.score_name})):null}),[i]);return(0,e.useEffect)((function(){var n,t,i,o;null===p||void 0===p||null===(n=p.current)||void 0===n||null===(t=n.getEchartsInstance)||void 0===t||null===(i=t.call(n))||void 0===i||null===(o=i.resize)||void 0===o||o.call(i)}),[i]),(0,d.jsxs)("div",{style:{width:"100%",backgroundColor:"#F0F4FA",display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,d.jsx)(c.Z,{type:"score"}),null!==i&&void 0!==i&&i.length?(0,d.jsxs)("div",{style:{width:"88vw",marginTop:"22px",display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,d.jsx)("div",{style:{marginBottom:"16px",fontWeight:"bold",alignSelf:"flex-start"},children:"\u60a8\u672c\u6b21\u8003\u8bd5\u7efc\u5408\u5f97\u5206".concat(null===x||void 0===x?void 0:x.score,"\u5206\u3002\u5404\u7ef4\u5ea6\u5f97\u5206\u5982\u4e0b\uff1a")}),(0,d.jsx)(l.Z,{ref:p,option:v,style:{width:"100%"}}),(0,d.jsxs)("div",{style:{width:"88vw"},children:[h.map((function(n,t){return(0,d.jsxs)("div",{style:{width:"100%",marginTop:t>0?"18px":"0"},children:[(0,d.jsx)("div",{style:{backgroundImage:"url(".concat("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHUAAAAGCAYAAAD9stHTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAN2SURBVHgBjVZNblQxDP6cZNpCpYotUm/Bijtwp7ZX4BxchQ1nQGLBplT8lL73YvwTJ3kzlWj0NHEc23H82c7Qh49fakkJmUA5E5dElBOh5MQ5gUrOPqtMArKsi61JaOfZXm46pDqua3ZkrzS5rLTqmX2fjS7Z9Fx+nA2ijYAVwAafT2iWmVh4hMXWLGudSfadXmUv+EqvRK6n+zJvom8yul/J7Ll9RkUSGVmLWytXkZG5sstQwqa0+LquK7Z8wCJrs8fqk8uswaPc6Op00rlgFWe2dPD1+gtbOcf2uIjdJ6yHS6wPf7G9v8Z6d4ft9la0/zOSHCafXE1uJEE0JnWaMLhsa7IZ7dcUjTQZZmp2yb4u1AijgnY9tR42x5EGKGjva1/y4DH5MWqWujmahMkPknwKlyiuK4BJAPa20ziDBJDucK0mxXNEObU91cuytzUf9FO6uFzB6aBFPvFtWVzn6QH09Cj0Kw2j29XEvheZt9fgz7K+ucGLRukhxowrYYCoFHVEOe7f0eWJ4XLMGmYRT3Y93sWYErvZwWbuB7WAMrpK7AVwYal5xPMF3JYC3dndVG3Hk8Nv2VjjYi5ZJ1MKrgJJyW+amqkUpnK3GToUuaK3F5CrykZbkYrEJgBSbocdpvyWcX4uMsL7+VuOFLl0JvJX4DcL+NtX0NUP0N0nvGikdgEPDk/xZyuC3clkmDuIWuEmvysv7inRgfBU4W5BZToQ+2oc+NBYujQzTkYcE06rDCWPPh1XeR22+nEBnlakJpZdrrrDVn0NQcsBoatnLSu/qpzuK0ib86crQKo22fsQ1SsNPhdwngJ6UPoswg3WSr24wDNXBR4fwVKpz+4dj6TOWGV5mTrd0tsscPRSQndc5YjmoMeeRsY11MsGPIP32DU4aHQadN0ZfvQUiwrjIQtvCGgBdSCt2nbRbUuiAXTlfXVyjdejtVyMlptap5lpC5zIGbBairm1y+wY28jeuoXHZYrPptc+uMgy5fRT0H+A15eNeY/dkDf1KFefH2lug1adc44HcIElW2ul3nKpVay7TAE0jzdyeoCp9+n+DPKuM8NiHzZatbV+H1m2fxx6hOcSQUevNYIALKqdrJindqxAhq/zm2kVGbxWqSZTvVKPj1WA413NBcDciLT9rtaFoX/paDkFyBLv6K/E9yDe2Zv6okr9B8Zw4jtOsNQQAAAAAElFTkSuQmCC",")"),backgroundSize:"160px 6px",backgroundRepeat:"no-repeat",backgroundPosition:"bottom 2px left",fontSize:"18px",fontWeight:"bold"},children:n.score_name}),(0,d.jsx)("div",{style:{fontSize:"16px",marginTop:"4px"},children:n.content})]},n.score_name)})),(0,d.jsx)("div",{style:{fontSize:"16px",fontWeight:"bold",marginTop:"24px"},children:x.content})]})]}):(0,d.jsxs)("div",{style:{marginTop:"22px",display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,d.jsx)("div",{className:"loader"}),(0,d.jsx)("div",{style:{fontSize:"14px",marginTop:"12px"},children:"\u8bc4\u5206\u4e2d\uff0c\u8bf7\u8010\u5fc3\u7b49\u5f85"})]}),(0,d.jsx)("div",{style:{marginTop:"62px",marginBottom:"16px"},children:"\u5efa\u8bae\u8bfe\u7a0b\u5982\u4e0b..."}),(0,d.jsxs)("ol",{style:{width:"88vw",paddingLeft:"16px",marginBottom:"18px"},children:[(0,d.jsx)("li",{children:"\u73af\u4fdd 7 \u53f7\u677f\u6750\u4ea7\u54c1\u77e5\u8bc6\u5356\u70b9\u4e00\u89c8."}),(0,d.jsx)("li",{children:"\u987e\u5bb6\u5bb6\u5c45\u534e\u4e1c\u533aTop sales\u987e\u4f73\u4f73\u9500\u552e\u8bdd\u672f"}),(0,d.jsx)("li",{children:"\u987e\u5bb6\u5bb6\u5c45\u4ea7\u54c1\u8bbe\u8ba1\u90e8-.\u73af\u4fdd 7 \u53f7\u677f\u6750\u4ea7\u54c1\u5f00\u53d1\u8bbe\u8ba1\u601d\u8def"})]}),(0,d.jsx)("div",{style:{width:"88vw",height:"157vw",borderRadius:"10px",overflow:"hidden",display:"flex",justifyContent:"center",alignItems:"center",position:"relative"},onClick:function(){g(!0)},children:(0,d.jsx)("video",{src:a,controls:!0,style:{width:"100%"}})}),f?(0,d.jsx)("div",{style:{width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.7)",position:"fixed",top:0,left:0,display:"flex",justifyContent:"center",alignItems:"center"},onClick:function(n){g(!1)},children:(0,d.jsx)("video",{src:a,style:{width:"100%"},controls:!0,onPlay:function(){var n,t;null===(n=window.player)||void 0===n||null===(t=n.pause)||void 0===t||t.call(n),window.isPlaying=!1}})}):null]})}},67394:function(n,t,i){var o=i(64836);t.Z=void 0;var e=o(i(45649)),r=i(80184);t.Z=(0,e.default)((0,r.jsx)("path",{d:"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"}),"ArrowBack")},53329:function(n,t,i){var o=i(64836);t.Z=void 0;var e=o(i(45649)),r=i(80184);t.Z=(0,e.default)((0,r.jsx)("path",{d:"M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3m3-10H5V5h10z"}),"Save")},45649:function(n,t,i){Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return o.createSvgIcon}});var o=i(37294)},39709:function(n,t,i){i.d(t,{Z:function(){return j}});var o=i(4942),e=i(63366),r=i(87462),a=i(72791),c=i(14036),l=i(67384),d=i(20838),s=i(66934),u=i(31402),f=i(82880),g=i(91793),p=i(13239),v=i(10139),h=i(64657);function x(n){return(0,h.ZP)("MuiLoadingButton",n)}var m=(0,i(59703).Z)("MuiLoadingButton",["root","loading","loadingIndicator","loadingIndicatorCenter","loadingIndicatorStart","loadingIndicatorEnd","endIconLoadingEnd","startIconLoadingStart"]),w=i(80184),Z=["children","disabled","id","loading","loadingIndicator","loadingPosition","variant"],y=(0,s.ZP)(f.Z,{shouldForwardProp:function(n){return function(n){return"ownerState"!==n&&"theme"!==n&&"sx"!==n&&"as"!==n&&"classes"!==n}(n)||"classes"===n},name:"MuiLoadingButton",slot:"Root",overridesResolver:function(n,t){return[t.root,t.startIconLoadingStart&&(0,o.Z)({},"& .".concat(m.startIconLoadingStart),t.startIconLoadingStart),t.endIconLoadingEnd&&(0,o.Z)({},"& .".concat(m.endIconLoadingEnd),t.endIconLoadingEnd)]}})((function(n){var t=n.ownerState,i=n.theme;return(0,r.Z)((0,o.Z)({},"& .".concat(m.startIconLoadingStart,", & .").concat(m.endIconLoadingEnd),{transition:i.transitions.create(["opacity"],{duration:i.transitions.duration.short}),opacity:0}),"center"===t.loadingPosition&&(0,o.Z)({transition:i.transitions.create(["background-color","box-shadow","border-color"],{duration:i.transitions.duration.short})},"&.".concat(m.loading),{color:"transparent"}),"start"===t.loadingPosition&&t.fullWidth&&(0,o.Z)({},"& .".concat(m.startIconLoadingStart,", & .").concat(m.endIconLoadingEnd),{transition:i.transitions.create(["opacity"],{duration:i.transitions.duration.short}),opacity:0,marginRight:-8}),"end"===t.loadingPosition&&t.fullWidth&&(0,o.Z)({},"& .".concat(m.startIconLoadingStart,", & .").concat(m.endIconLoadingEnd),{transition:i.transitions.create(["opacity"],{duration:i.transitions.duration.short}),opacity:0,marginLeft:-8}))})),b=(0,s.ZP)("span",{name:"MuiLoadingButton",slot:"LoadingIndicator",overridesResolver:function(n,t){var i=n.ownerState;return[t.loadingIndicator,t["loadingIndicator".concat((0,c.Z)(i.loadingPosition))]]}})((function(n){var t=n.theme,i=n.ownerState;return(0,r.Z)({position:"absolute",visibility:"visible",display:"flex"},"start"===i.loadingPosition&&("outlined"===i.variant||"contained"===i.variant)&&{left:"small"===i.size?10:14},"start"===i.loadingPosition&&"text"===i.variant&&{left:6},"center"===i.loadingPosition&&{left:"50%",transform:"translate(-50%)",color:(t.vars||t).palette.action.disabled},"end"===i.loadingPosition&&("outlined"===i.variant||"contained"===i.variant)&&{right:"small"===i.size?10:14},"end"===i.loadingPosition&&"text"===i.variant&&{right:6},"start"===i.loadingPosition&&i.fullWidth&&{position:"relative",left:-10},"end"===i.loadingPosition&&i.fullWidth&&{position:"relative",right:-10})})),j=a.forwardRef((function(n,t){var i=a.useContext(g.Z),o=(0,v.Z)(i,n),s=(0,u.Z)({props:o,name:"MuiLoadingButton"}),f=s.children,h=s.disabled,m=void 0!==h&&h,j=s.id,I=s.loading,A=void 0!==I&&I,k=s.loadingIndicator,S=s.loadingPosition,P=void 0===S?"center":S,C=s.variant,L=void 0===C?"text":C,E=(0,e.Z)(s,Z),B=(0,l.Z)(j),z=null!=k?k:(0,w.jsx)(p.Z,{"aria-labelledby":B,color:"inherit",size:16}),W=(0,r.Z)({},s,{disabled:m,loading:A,loadingIndicator:z,loadingPosition:P,variant:L}),M=function(n){var t=n.loading,i=n.loadingPosition,o=n.classes,e={root:["root",t&&"loading"],startIcon:[t&&"startIconLoading".concat((0,c.Z)(i))],endIcon:[t&&"endIconLoading".concat((0,c.Z)(i))],loadingIndicator:["loadingIndicator",t&&"loadingIndicator".concat((0,c.Z)(i))]},a=(0,d.Z)(e,x,o);return(0,r.Z)({},o,a)}(W),R=A?(0,w.jsx)(b,{className:M.loadingIndicator,ownerState:W,children:z}):null;return(0,w.jsxs)(y,(0,r.Z)({disabled:m||A,id:B,ref:t},E,{variant:L,classes:M,ownerState:W,children:["end"===W.loadingPosition?f:R,"end"===W.loadingPosition?R:f]}))}))},37294:function(n,t,i){i.r(t),i.d(t,{capitalize:function(){return e.Z},createChainedFunction:function(){return r},createSvgIcon:function(){return a.Z},debounce:function(){return c.Z},deprecatedPropType:function(){return l},isMuiElement:function(){return d.Z},ownerDocument:function(){return s.Z},ownerWindow:function(){return u.Z},requirePropFactory:function(){return f},setRef:function(){return g},unstable_ClassNameGenerator:function(){return y},unstable_useEnhancedEffect:function(){return p.Z},unstable_useId:function(){return v.Z},unsupportedProp:function(){return h},useControlled:function(){return x.Z},useEventCallback:function(){return m.Z},useForkRef:function(){return w.Z},useIsFocusVisible:function(){return Z.Z}});var o=i(84925),e=i(14036),r=i(55253).Z,a=i(74223),c=i(83199);var l=function(n,t){return function(){return null}},d=i(5925),s=i(98301),u=i(17602);i(87462);var f=function(n,t){return function(){return null}},g=i(77576).Z,p=i(40162),v=i(67384);var h=function(n,t,i,o,e){return null},x=i(98278),m=i(89683),w=i(42071),Z=i(56943),y={configure:function(n){o.Z.configure(n)}}},67384:function(n,t,i){var o=i(56046);t.Z=o.Z}}]);
//# sourceMappingURL=660.85d12dc7.chunk.js.map