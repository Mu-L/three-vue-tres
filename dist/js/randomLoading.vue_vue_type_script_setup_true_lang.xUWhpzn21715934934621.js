import{l as a,v as t,y as l,s as n}from"./starLoading.cIKWU4cs1715934934621.js";import{l as g}from"./cssLoaders.FNdhmzXt1715934934621.js";import{l as m}from"./bubbleLoading.2dQ7sL0Q1715934934621.js";import{a1 as u,a2 as h,o,x as r,L as e,Z as y}from"./vendor.1SfJ1rT91715934934621.js";const _=u({__name:"randomLoading",setup(w){const s=h({styleNum:0,showProgress:!0});return s.styleNum=Math.floor(Math.random()*24),s.showProgress=Math.random()<.5,console.log(s.styleNum,s.showProgress),(P,N)=>s.styleNum<10?(o(),r(e(a),{key:0,styleNum:s.styleNum,showProgress:s.showProgress},null,8,["styleNum","showProgress"])):s.styleNum<20?(o(),r(e(g),{key:1,styleNum:s.styleNum-10,showProgress:s.showProgress},null,8,["styleNum","showProgress"])):s.styleNum===20?(o(),r(e(m),{key:2,showProgress:s.showProgress},null,8,["showProgress"])):s.styleNum===21?(o(),r(e(t),{key:3,showProgress:s.showProgress},null,8,["showProgress"])):s.styleNum===22?(o(),r(e(l),{key:4,showProgress:s.showProgress},null,8,["showProgress"])):s.styleNum===23?(o(),r(e(n),{key:5,showProgress:s.showProgress},null,8,["showProgress"])):y("",!0)}});export{_};
