import{a as T,b as h,T as _,r as i,c as y,g as m,d as S,j as t,R as C,u as f,e as I,V as M}from"./index-DJt4o9BK.js";import{S as E}from"./SplitText-CNuFW87Y.js";const p=e=>e===Object(e)&&!Array.isArray(e)&&typeof e!="function";function w(e,c){const u=T(o=>o.gl),s=h(_,p(e)?Object.values(e):e);return i.useLayoutEffect(()=>{c==null||c(s)},[c]),i.useEffect(()=>{if("initTexture"in u){let o=[];Array.isArray(s)?o=s:s instanceof y?o=[s]:p(s)&&(o=Object.values(s)),o.forEach(a=>{a instanceof y&&u.initTexture(a)})}},[u,s]),i.useMemo(()=>{if(p(e)){const o={};let a=0;for(const v in e)o[v]=s[a++];return o}else return s},[e,s])}w.preload=e=>h.preload(_,e);w.clear=e=>h.clear(_,e);var R=`varying vec2 vUv;\r
uniform float uTime;\r
uniform float uHover;\r
uniform vec2 uMouse;

void main() {\r
    vUv = uv;\r
    vec3 pos = position;\r
    \r
    
    float dist = distance(vUv, (uMouse * 0.5 + 0.5));\r
    float strength = smoothstep(0.5, 0.0, dist) * 0.1 * uHover;\r
    pos.z += strength;\r
    \r
    
    pos.z += sin(uv.x * 10.0 + uTime) * 0.02 * uHover;\r
    \r
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);\r
}`,D=`uniform float uTime;\r
uniform float uProgress;\r
uniform sampler2D uTexture1;\r
uniform sampler2D uTexture2;\r
varying vec2 vUv;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }\r
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }\r
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }\r
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {\r
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\r
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\r
  vec3 i  = floor(v + dot(v, C.yyy) );\r
  vec3 x0 = v - i + dot(i, C.xxx) ;\r
  vec3 g = step(x0.yzx, x0.xyz);\r
  vec3 l = 1.0 - g;\r
  vec3 i1 = min( g.xyz, l.zxy );\r
  vec3 i2 = max( g.xyz, l.zxy );\r
  vec3 x1 = x0 - i1 + C.xxx;\r
  vec3 x2 = x0 - i2 + C.yyy;\r
  vec3 x3 = x0 - D.yyy;\r
  i = mod289(i);\r
  vec4 p = permute( permute( permute(\r
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\r
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\r
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\r
  float n_ = 0.142857142857;\r
  vec3  ns = n_ * D.wyz - D.xzx;\r
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);\r
  vec4 x_ = floor(j * ns.z);\r
  vec4 y_ = floor(j - 7.0 * x_);\r
  vec4 x = x_ *ns.x + ns.yyyy;\r
  vec4 y = y_ *ns.x + ns.yyyy;\r
  vec4 h = 1.0 - abs(x) - abs(y);\r
  vec4 b0 = vec4( x.xy, y.xy );\r
  vec4 b1 = vec4( x.zw, y.zw );\r
  vec4 s0 = floor(b0)*2.0 + 1.0;\r
  vec4 s1 = floor(b1)*2.0 + 1.0;\r
  vec4 sh = -step(h, vec4(0.0));\r
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\r
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\r
  vec3 p0 = vec3(a0.xy,h.x);\r
  vec3 p1 = vec3(a0.zw,h.y);\r
  vec3 p2 = vec3(a1.xy,h.z);\r
  vec3 p3 = vec3(a1.zw,h.w);\r
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\r
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;\r
  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\r
  m = m * m;\r
  return 105.0 * dot(m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );\r
}

void main() {\r
    vec2 uv = vUv;\r
    \r
    
    vec4 tex1 = texture2D(uTexture1, uv);\r
    vec4 tex2 = texture2D(uTexture2, uv);\r
    \r
    
    float noise = snoise(vec3(uv * 4.0, uTime * 0.1));\r
    float threshold = uProgress * 1.2 - 0.1; 
    float mask = smoothstep(threshold - 0.1, threshold + 0.1, noise + uv.x * 0.2); 
    \r
    vec4 finalColor = mix(tex1, tex2, mask);\r
    \r
    
    float vig = 1.0 - distance(uv, vec2(0.5)) * 1.5;\r
    finalColor.rgb *= vig;\r
    \r
    gl_FragColor = finalColor;\r
}`;function A({activeProjectId:e,projects:c}){const u=i.useRef(),{viewport:s}=T(),x=i.useRef(e),o=w(c.map(v=>v.image)),a=i.useMemo(()=>({uTime:{value:0},uProgress:{value:0},uTexture1:{value:o[0]||new y},uTexture2:{value:o[0]||new y}}),[]);return i.useEffect(()=>{if(!e)return;const v=c.findIndex(l=>l.id===e),d=o[v];e!==x.current&&(a.uTexture2.value=d,m.to(a.uProgress,{value:1,duration:.7,ease:"power3.inOut",onComplete:()=>{a.uTexture1.value=d,a.uProgress.value=0}}),x.current=e)},[e,c,o,a]),S((v,d)=>{a.uTime.value+=d}),t.jsxs("mesh",{ref:u,scale:[s.width*.5,s.height*.6,1],children:[t.jsx("planeGeometry",{args:[1,1,32,32]}),t.jsx("shaderMaterial",{vertexShader:R,fragmentShader:D,uniforms:a,transparent:!0})]})}const g=[{id:1,title:"Aether",category:"WebGL / Brand",year:"2024",color:"#1a3a2e",image:"/images/project-1.jpg"},{id:2,title:"Luminary",category:"Interactive / 3D",year:"2024",color:"#2d1a0e",image:"/images/project-2.jpg"},{id:3,title:"Parallax",category:"Creative Dev",year:"2023",color:"#0e1a2d",image:"/images/project-3.jpg"},{id:4,title:"Void",category:"Installation",year:"2023",color:"#1a0e2d",image:"/images/project-4.jpg"}],H="_work_k6atu_1",L="_container_k6atu_14",O="_left_k6atu_25",P="_heading_k6atu_37",U="_list_k6atu_41",$="_row_k6atu_45",V="_isHovered_k6atu_54",W="_title_k6atu_57",q="_rowInner_k6atu_74",F="_cardImage_k6atu_88",G="_img_k6atu_95",B="_content_k6atu_105",J="_meta_k6atu_119",K="_index_k6atu_125",Q="_details_k6atu_138",X="_right_k6atu_151",Y="_preview_k6atu_164",Z="_view_k6atu_171",n={work:H,container:L,left:O,heading:P,list:U,row:$,isHovered:V,title:W,rowInner:q,cardImage:F,img:G,content:B,meta:J,index:K,details:Q,right:X,preview:Y,view:Z},te=C.memo(()=>{const e=i.useRef(),c=i.useRef(),[u,s]=i.useState(null),[x,o]=i.useState(null),a=f(r=>r.setCursorType),v=f(r=>r.setActiveProject),d=f(r=>r.isTransitioning),l=f(r=>r.isMobile),k=i.useCallback(r=>{l||(s(r),v(r),a("view"))},[l,v,a]),j=i.useCallback(()=>{l||(s(null),a("default"))},[l,a]);return i.useLayoutEffect(()=>{if(d)return;const r=m.context(()=>{!l&&m.ScrollTrigger&&m.ScrollTrigger.create({trigger:e.current,start:"top top",end:"+=200%",pin:!0,scrub:1,onUpdate:z=>{const b=z.progress,N=Math.min(g.length-1,Math.floor(b*g.length));o(g[N].id)}}),m.from(".work-heading .char",{scrollTrigger:{trigger:e.current,start:"top 80%"},y:"100%",opacity:0,duration:1,stagger:.02,ease:"lusion"}),m.from(c.current.children,{scrollTrigger:{trigger:e.current,start:"top 70%"},y:60,opacity:0,duration:1.2,stagger:.1,ease:"power3.out"})},e);return()=>r.revert()},[d,l]),t.jsx("section",{ref:e,className:n.work,children:t.jsxs("div",{className:n.container,children:[t.jsxs("div",{className:n.left,children:[t.jsx("div",{className:`${n.heading} work-heading`,children:t.jsx(E,{className:"t-label",children:"SELECTED WORK"})}),t.jsx("div",{ref:c,className:n.list,children:g.map(r=>t.jsx(I,{to:`/project/${r.id}`,className:`${n.row} ${u===r.id||x===r.id?n.isHovered:""}`,onMouseEnter:()=>k(r.id),onMouseLeave:j,children:t.jsxs("div",{className:n.rowInner,children:[l&&t.jsx("div",{className:n.cardImage,children:t.jsx("img",{src:r.image,alt:r.title,loading:"lazy",className:n.img})}),t.jsxs("div",{className:n.content,children:[t.jsxs("div",{className:n.meta,children:[t.jsx("span",{className:n.index,children:u===r.id||x===r.id?"→":String(r.id).padStart(2,"0")}),t.jsx("h3",{className:`${n.title} t-display`,children:r.title})]}),t.jsxs("div",{className:n.details,children:[t.jsx("span",{className:"t-label",children:r.category}),t.jsx("span",{className:"t-label",children:r.year})]})]})]})},r.id))})]}),!l&&t.jsx("div",{className:n.right,children:t.jsx("div",{className:n.preview,children:t.jsx(M,{className:n.view,children:t.jsx(A,{activeProjectId:u||x,projects:g})})})})]})})});export{te as default};
