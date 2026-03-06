(function(){"use strict";class U{constructor(){console.log("🖼️ PropertyGalleryModal constructor called"),this.modal=null,this.currentIndex=0,this.images=[],this.init()}init(){console.log("🖼️ PropertyGalleryModal init called, readyState:",document.readyState),this.createModal(),document.readyState==="loading"?(console.log("🖼️ DOM still loading, waiting for DOMContentLoaded"),document.addEventListener("DOMContentLoaded",()=>{this.attachGalleryHandlers()})):(console.log("🖼️ DOM already loaded, attaching handlers immediately"),this.attachGalleryHandlers()),document.addEventListener("keydown",t=>{this.modal.classList.contains("active")&&(t.key==="Escape"?this.close():t.key==="ArrowLeft"?this.prev():t.key==="ArrowRight"&&this.next())})}createModal(){document.body.insertAdjacentHTML("beforeend",`
            <div class="property-gallery-modal" id="propertyGalleryModal">
                <div class="property-gallery-modal-overlay"></div>
                <div class="property-gallery-modal-content">
                    <button class="property-gallery-modal-close" aria-label="Close gallery">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                    <button class="property-gallery-modal-prev" aria-label="Previous image">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button class="property-gallery-modal-next" aria-label="Next image">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <img class="property-gallery-modal-image" src="" alt="Property image">
                    <div class="property-gallery-modal-counter">
                        <span class="current">1</span> out of <span class="total">1</span>
                    </div>
                </div>
            </div>
        `),this.modal=document.getElementById("propertyGalleryModal"),console.log("🖼️ Modal created:",this.modal?"success":"failed"),this.modal.querySelector(".property-gallery-modal-close").addEventListener("click",()=>this.close()),this.modal.querySelector(".property-gallery-modal-prev").addEventListener("click",()=>this.prev()),this.modal.querySelector(".property-gallery-modal-next").addEventListener("click",()=>this.next()),this.modal.querySelector(".property-gallery-modal-overlay").addEventListener("click",()=>this.close())}attachGalleryHandlers(){console.log("🖼️ attachGalleryHandlers called");const t=document.querySelectorAll("[data-gallery]");console.log("🖼️ Found galleries:",t.length),t.forEach(o=>{const r=o.querySelectorAll("img[data-gallery-index]");console.log("🖼️ Gallery has images:",r.length),r.forEach(l=>{l.style.cursor="pointer",l.addEventListener("click",a=>{console.log("🖼️ Image clicked, index:",a.target.dataset.galleryIndex);const s=parseInt(a.target.dataset.galleryIndex);this.open(o,s)})})})}open(t,o=0){console.log("🖼️ open() called, startIndex:",o);const r=t.querySelectorAll("img[data-gallery-index]");if(this.images=Array.from(r).map(l=>l.src),console.log("🖼️ Collected images:",this.images.length,this.images),this.images.length===0){console.log("🖼️ No images found, aborting");return}this.currentIndex=o,this.showImage(),console.log("🖼️ Adding active class to modal"),this.modal.classList.add("active"),document.body.style.overflow="hidden"}close(){this.modal.classList.remove("active"),document.body.style.overflow="",this.images=[],this.currentIndex=0}next(){this.currentIndex=(this.currentIndex+1)%this.images.length,this.showImage()}prev(){this.currentIndex=(this.currentIndex-1+this.images.length)%this.images.length,this.showImage()}showImage(){const t=this.modal.querySelector(".property-gallery-modal-image"),o=this.modal.querySelector(".property-gallery-modal-counter .current"),r=this.modal.querySelector(".property-gallery-modal-counter .total");t.src=this.images[this.currentIndex],o.textContent=this.currentIndex+1,r.textContent=this.images.length;const l=this.modal.querySelector(".property-gallery-modal-prev"),a=this.modal.querySelector(".property-gallery-modal-next");this.images.length<=1?(l.style.display="none",a.style.display="none"):(l.style.display="flex",a.style.display="flex")}}let L;document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{L=new U,document.getElementById("property-map")&&E()}):(L=new U,document.getElementById("property-map")&&E()),window.initPropertyMapNow=E,window.attachGalleryHandlers=()=>{L&&L.attachGalleryHandlers()};function E(){const e=document.getElementById("property-map");if(!e){console.log("No map container found on this page");return}const t=parseFloat(e.dataset.lat)||40.7207559,o=parseFloat(e.dataset.lng)||-74.0007613,r=parseInt(e.dataset.zoom)||15;console.log("🗺️ Initializing map with:",{lat:t,lng:o,zoom:r}),window.google&&window.google.maps?l():W().then(l).catch(a=>{console.error("Failed to load Google Maps:",a),e.innerHTML='<div style="padding:20px;text-align:center;color:#999">Map could not be loaded</div>'});function l(){const a=new google.maps.Map(e,{center:{lat:t,lng:o},zoom:r,mapTypeControl:!1,streetViewControl:!1,fullscreenControl:!0});new google.maps.Marker({position:{lat:t,lng:o},map:a,title:"Property Location"}),console.log("🗺️ Map created successfully")}}function W(){return new Promise((e,t)=>{if(window.google&&window.google.maps){e();return}const o=document.createElement("script");o.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCBTROq6LuvF_IE1r46-T4AeTSV-0d7my8",o.async=!0,o.defer=!0,o.onload=e,o.onerror=t,document.head.appendChild(o)})}const J="https://yjqojdzcrxarffqolmtn.supabase.co",R="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqcW9qZHpjcnhhcmZmcW9sbXRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczOTk5NTIsImV4cCI6MjA1Mjk3NTk1Mn0.Sy-rSFYo_C5mJKQRCxFVeI1mW7P-FApT88LpMb7gCl8";function X(){try{const e=window.Static?.SQUARESPACE_CONTEXT?.website?.id;return e?(console.log("🆔 Supabase: Found Squarespace website ID:",e),e):(console.warn("⚠️ Supabase: No website ID found in SQUARESPACE_CONTEXT"),null)}catch(e){return console.error("❌ Supabase: Error getting website ID:",e),null}}async function Q(){try{console.log("🔍 Supabase: Attempting to fetch plugin data...");const e=X();if(!e)return console.log("⚠️ Supabase: Cannot query without website ID"),null;const t=await fetch(`${J}/rest/v1/site_plugin_data?plugin_id=eq.real-estate&site_id=eq.${e}&select=data`,{method:"GET",headers:{apikey:R,Authorization:`Bearer ${R}`,"Content-Type":"application/json",Prefer:"return=representation"}});if(!t.ok)return console.error("❌ Supabase: Query failed:",t.status,t.statusText),null;const o=await t.json();if(!o||o.length===0)return console.log("⚠️ Supabase: No plugin data found for this site"),null;const r=o[0].data;return console.log("✅ Supabase: Plugin data retrieved:",r),r}catch(e){return console.error("❌ Supabase: Error fetching plugin data:",e),null}}function Y(e,t){if(!e||!e.collections)return t;console.log("🔄 Supabase: Merging collection IDs with default settings...");const o=e.collections,r={...t,general:{...t.general,activeCollectionId:o["squarehero-re-for-sale"]||"",soldCollectionId:o["squarehero-re-for-sale-archive"]||"",rentalsCollectionId:o["squarehero-re-for-rent"]||"",rentedCollectionId:o["squarehero-re-for-rent-archive"]||""},design:{...t.design,variablesUrl:e.cssUrl||t.design?.variablesUrl||""},_supabaseRecovery:!0,_configUrl:e.configUrl||null,_cssUrl:e.cssUrl||null};return console.log("✅ Supabase: Merged settings:",{activeCollectionId:r.general.activeCollectionId,soldCollectionId:r.general.soldCollectionId,rentalsCollectionId:r.general.rentalsCollectionId,rentedCollectionId:r.general.rentedCollectionId,recoveryMode:r._supabaseRecovery}),r}async function V(e){console.log("🔄 Supabase: Attempting to restore collection IDs...");const t=await Q();return t?Y(t,e):(console.log("⚠️ Supabase: No data available for restoration"),e)}function K(){console.log("🔍 Settings: Looking for meta tags...");const e=document.head.querySelectorAll("meta");console.log("📋 Settings: Found meta tags:",e.length);for(const o of e)if(o.getAttribute("squarehero-plugin")==="real-estate-listings-v2"){const r=o.getAttribute("license-key");if(r)try{const l=atob(r),a=JSON.parse(l);return console.log("📦 Settings: Reference data:",a),a.css&&(window._realEstateCssUrl=a.css),a.config||null}catch(l){console.error("❌ Settings: Error parsing reference:",l)}}const t=window.top.document.head.querySelectorAll("meta");for(const o of t)if(o.getAttribute("squarehero-plugin")==="real-estate-listings-v2"){const r=o.getAttribute("license-key");if(r)try{const l=atob(r),a=JSON.parse(l);return console.log("📦 Settings: Reference data (top window):",a),a.css&&(window._realEstateCssUrl=a.css),a.config||null}catch(l){console.error("❌ Settings: Error parsing reference:",l)}}return console.log("❌ Settings: No valid configuration found"),null}async function P(){try{console.log("📥 Settings: Loading settings...");const e=K();if(!e){console.log("⚠️ Settings: No config reference found, attempting Supabase fallback...");const l=await V(_());return l._supabaseRecovery?(console.log("✅ Settings: Collection IDs restored from Supabase"),l._cssUrl?await x(l._cssUrl):(console.log("⚠️ Settings: No CSS file in Supabase recovery, injecting defaults inline"),v()),l):(console.log("⚠️ Settings: Supabase fallback failed, returning defaults"),v(),_())}console.log("🔗 Settings: Config reference found:",e);const t=await fetch(e+"?"+Date.now());if(!t.ok){console.log("⚠️ Settings: Failed to load settings, attempting Supabase fallback...");const l=await V(_());return l._supabaseRecovery?(console.log("✅ Settings: Collection IDs restored from Supabase"),l._cssUrl?await x(l._cssUrl):(console.log("⚠️ Settings: No CSS file in Supabase recovery, injecting defaults inline"),v()),l):(console.log("⚠️ Settings: Supabase fallback failed, returning defaults"),v(),_())}const o=await t.json();console.log("✅ Settings: Loaded settings from JSON"),console.log("📋 Settings: Collection IDs from JSON:",{activeCollectionId:o.general?.activeCollectionId,soldCollectionId:o.general?.soldCollectionId,rentalsCollectionId:o.general?.rentalsCollectionId,rentedCollectionId:o.general?.rentedCollectionId,websiteId:o.general?.websiteId,authorId:o.general?.authorId});let r=null;return window._realEstateCssUrl?(r=window._realEstateCssUrl,console.log("📦 Settings: Using CSS URL from meta tag:",r)):o.design?.variablesUrl&&(r=o.design.variablesUrl,console.log("📦 Settings: Using CSS URL from JSON:",r)),r?await x(r):(console.log("⚠️ Settings: No CSS file found, injecting default variables inline"),v()),o}catch(e){console.error("❌ Settings: Error loading settings:",e),console.log("🔄 Settings: Attempting Supabase fallback after error...");const t=await V(_());return t._supabaseRecovery?(console.log("✅ Settings: Collection IDs restored from Supabase after error"),t._cssUrl?await x(t._cssUrl):(console.log("⚠️ Settings: No CSS file in Supabase recovery, injecting defaults inline"),v()),t):(v(),_())}}function x(e){return new Promise((t,o)=>{try{const r=window.realEstateTargetDocument||document;console.log("🎯 Settings: Injecting CSS variables into document:",{usingRealEstateTargetDocument:!!window.realEstateTargetDocument,documentURL:r.location?.href||"unknown",documentTitle:r.title||"untitled",hasAdminContainer:!!r.querySelector(".admin-container"),headElementExists:!!r.head,cssUrl:e});const l=r.querySelector("style[data-re-default-variables]");l&&(l.remove(),console.log("🗑️ Settings: Removed inline default CSS variables"));const a=r.querySelector("link[data-re-variables]");if(a){console.log("🔄 Settings: Updating existing CSS variables link"),a.href=e+"?"+Date.now(),a.onload=()=>{console.log("✅ Settings: CSS variables reloaded"),t()},a.onerror=()=>{console.error("❌ Settings: Error reloading CSS variables"),o(new Error("Failed to reload CSS variables"))};return}const s=r.createElement("link");s.rel="stylesheet",s.href=e+"?"+Date.now(),s.setAttribute("data-re-variables","true"),s.onload=()=>{console.log("✅ Settings: CSS variables loaded:",e),console.log("📍 Settings: CSS appended to document:",{docURL:r.location?.href||"unknown",linkElement:s,parentHead:r.head}),t()},s.onerror=()=>{console.error("❌ Settings: Error loading CSS variables:",e),o(new Error("Failed to load CSS variables"))},r.head.appendChild(s),console.log("📤 Settings: CSS link created and appended to <head>")}catch(r){console.error("❌ Settings: Error injecting CSS variables:",r),o(r)}})}function v(){try{const e=window.realEstateTargetDocument||document;if(e.querySelector("style[data-re-default-variables]")){console.log("✅ Settings: Default CSS variables already injected inline");return}const o=e1({}),r=e.createElement("style");r.setAttribute("data-re-default-variables","true"),r.textContent=o,e.head.appendChild(r),console.log("✅ Settings: Default CSS variables injected inline")}catch(e){console.error("❌ Settings: Error injecting default CSS inline:",e)}}function _(){return{general:{enableForSale:!0,enableRentals:!1,activeCollectionUrl:"",soldCollectionUrl:"",soldBehavior:"hide",enableSoldListings:!0,rentalsCollectionUrl:"",rentedCollectionUrl:"",rentedBehavior:"hide",enableRentedListings:!1,currency:"USD",areaUnit:"sqft",activeCollectionId:"",rentalsCollectionId:"",soldCollectionId:"",rentedCollectionId:"",websiteId:"",authorId:""},fieldVisibility:{price:!0,location:!0,area:!0,bedrooms:!0,bathrooms:!0,garage:!1},pageFieldVisibility:{price:!0,location:!0,area:!0,bedrooms:!0,bathrooms:!0,garage:!0},rentalFieldVisibility:{rentAmount:!0,deposit:!0,leaseTerm:!0,availableFrom:!0,location:!0,area:!0,bedrooms:!0,bathrooms:!0,garage:!0,furnished:!0,catsAllowed:!0,dogsAllowed:!0,utilitiesIncluded:!0},rentalPageFieldVisibility:{rentAmount:!0,deposit:!0,leaseTerm:!0,availableFrom:!0,location:!0,area:!0,bedrooms:!0,bathrooms:!0,garage:!0,furnished:!0,catsAllowed:!0,dogsAllowed:!0,utilitiesIncluded:!0},filterVisibility:{bedrooms:!0,bathrooms:!0,area:!0,price:!0,location:!1,propertyType:!1},design:{variablesUrl:null},customFields:[]}}function e1(e){const t=e.card||{},o=e.image||{},r=e.title||{},l=e.price||{},a=e.icons||{},s=e.badge||{},i=e.page||{},n=t.shadow??0,p=Math.min(n/100*.5,.5),m=Math.round(n/100*24),f=Math.round(n/100*8),$=(t.shadowColor||"rgba(0, 0, 0, 1)").replace(/rgba?\(([^)]+)\)/,(c,d)=>{const g=d.split(",").map(w=>w.trim());return g.length===4?`rgba(${g[0]}, ${g[1]}, ${g[2]}, ${p})`:`rgba(${g[0]}, ${g[1]}, ${g[2]}, ${p})`}),S=n>0?`0 ${Math.round(n/100*4)}px ${m}px ${f}px ${$}`:"none";return`/* Real Estate Plugin - Dynamic Variables */
/* Auto-generated from settings - Do not edit manually */

:root,
.admin-container {
    /* Card styles */
    --re-card-background: ${t.backgroundColor};
    --re-card-border-radius: ${t.borderRadius}${t.borderRadiusUnit};
    --re-card-padding: ${t.padding}${t.paddingUnit};
    --re-card-shadow: ${S};
    --re-card-hover-effect: ${t.hoverEffect};
    
    /* Image styles */
    --re-image-padding: ${o.layout==="inset"?t.padding+t.paddingUnit:"0"};
    --re-image-aspect-ratio: ${o.aspectRatio};
    --re-image-object-fit: ${o.objectFit};
    --re-image-border-radius: ${o.borderRadius}${o.borderRadiusUnit};
    
    /* Title styles */
    --re-title-color: ${r.color};
    --re-title-font-size: ${r.fontSize}${r.fontSizeUnit};
    --re-title-font-weight: ${r.fontWeight};
    --re-title-line-height: ${r.lineHeight};
    
    /* Price styles */
    --re-price-color: ${l.color};
    --re-price-font-size: ${l.fontSize}${l.fontSizeUnit};
    --re-price-font-weight: ${l.fontWeight};
    
    /* Icon styles */
    --re-icon-color: ${a.color};
    --re-icon-size: ${a.size}${a.sizeUnit};
    --re-icon-spacing: ${a.spacing}${a.spacingUnit};
    --re-property-details-gap: ${a.detailsGap}${a.detailsGapUnit};
    --re-icon-text-color: ${a.textColor};
    --re-icon-text-size: ${a.textSize}${a.textSizeUnit};
    
    /* Badge styles */
    --re-badge-sold-background: ${s.soldBackground};
    --re-badge-rented-background: ${s.rentedBackground};
    --re-badge-text-color: ${s.textColor};
    --re-badge-font-size: ${s.fontSize}${s.fontSizeUnit};
    --re-badge-font-weight: ${s.fontWeight};
    --re-badge-border-radius: ${s.borderRadius}${s.borderRadiusUnit};
    --re-badge-padding: ${s.padding}${s.paddingUnit};
    
    /* Page Title styles */
    --re-page-title-color: ${i?.title?.color};
    --re-page-title-font-family: ${i?.title?.fontFamily==="heading"?"var(--heading-font-font-family)":"var(--body-font-font-family)"};
    --re-page-title-font-size: ${i?.title?.fontSize}${i?.title?.fontSizeUnit};
    --re-page-title-font-weight: ${i?.title?.fontWeight};
    --re-page-title-line-height: ${i?.title?.lineHeight};
    
    /* Page Price styles */
    --re-page-price-color: ${i?.price?.color};
    --re-page-price-font-family: ${i?.price?.fontFamily==="heading"?"var(--heading-font-font-family)":"var(--body-font-font-family)"};
    --re-page-price-font-size: ${i?.price?.fontSize}${i?.price?.fontSizeUnit};
    --re-page-price-font-weight: ${i?.price?.fontWeight};
    
    /* Gallery styles */
    --re-gallery-gap: ${i?.gallery?.gap}${i?.gallery?.gapUnit};
    --re-gallery-grid-aspect-ratio: ${i?.gallery?.gridAspectRatio};
    
    /* Page Property Details styles */
    --re-page-details-icon-size: ${i?.details?.iconSize}${i?.details?.iconSizeUnit};
    --re-page-details-icon-color: ${i?.details?.iconColor};
    --re-page-details-text-size: ${i?.details?.textSize}${i?.details?.textSizeUnit};
    --re-page-details-text-color: ${i?.details?.textColor};
    --re-page-details-text-weight: ${i?.details?.textWeight};
    --re-page-details-card-background: ${i?.details?.cardMode?i?.details?.cardBackgroundColor:"transparent"};
    --re-page-details-card-border-radius: ${i?.details?.cardMode?`${i?.details?.cardBorderRadius}${i?.details?.cardBorderRadiusUnit}`:"0"};
    --re-page-details-card-padding: ${i?.details?.cardMode?`${i?.details?.cardPadding}${i?.details?.cardPaddingUnit}`:"0"};
    --re-page-details-card-shadow: ${i?.details?.cardMode?(()=>{const c=i?.details?.cardShadow,d=Math.min(c/100*.3,.3),w=(i?.details?.cardShadowColor).replace(/rgba?\(([^)]+)\)/,(M,h)=>{const C=h.split(",").map(G=>G.trim());return C.length===4?`rgba(${C[0]}, ${C[1]}, ${C[2]}, ${d})`:`rgba(${C[0]}, ${C[1]}, ${C[2]}, ${d})`});return`0 ${Math.round(c/100*4)}px ${Math.round(c/100*12)}px ${Math.round(c/100*4)}px ${w}`})():"none"};
    
    /* Listings Page - Map */
    --re-listings-map-full-width: ${e.listingsPage?.map?.fullWidth?"1":"0"};
    --re-listings-map-pin-color: ${e.listingsPage?.map?.pinColor};
    --re-listings-map-style: ${e.listingsPage?.map?.style};
    
    /* Listings Page - Filters */
    --re-listings-filters-font-size: ${e.listingsPage?.filters?.fontSize}${e.listingsPage?.filters?.fontSizeUnit};
    --re-primary-color: ${e.listingsPage?.filters?.primaryColor};
    --re-secondary-color: ${e.listingsPage?.filters?.secondaryColor};
    --re-listings-filters-color: ${e.listingsPage?.filters?.color};
    --re-listings-filters-border-radius: ${e.listingsPage?.filters?.borderRadius}${e.listingsPage?.filters?.borderRadiusUnit};
    --re-listings-filters-card-padding: ${e.listingsPage?.filters?.enableCardStyle?`${e.listingsPage?.filters?.cardPadding}${e.listingsPage?.filters?.cardPaddingUnit}`:"0"};
    --re-listings-filters-card-background: ${e.listingsPage?.filters?.enableCardStyle?e.listingsPage?.filters?.cardBackground:"transparent"};
    --re-listings-filters-card-border-radius: ${e.listingsPage?.filters?.enableCardStyle?`${e.listingsPage?.filters?.cardBorderRadius}${e.listingsPage?.filters?.cardBorderRadiusUnit}`:"0"};
    
    /* Listings Page - Grid */
    --re-listings-grid-gap: ${e.listingsPage?.grid?.gap}${e.listingsPage?.grid?.gapUnit};
    --re-listings-grid-columns: ${e.listingsPage?.grid?.layoutType==="fixed"?e.listingsPage?.grid?.columnsCount:"auto-fill"};
    --re-listings-grid-min-width: ${e.listingsPage?.grid?.minCardWidth}${e.listingsPage?.grid?.minCardWidthUnit};
    
    /* Favourites/Wishlist styles */
    --re-wishlist-button-background: ${e.wishlist?.buttonBackground};
    --re-wishlist-button-color: ${e.wishlist?.buttonColor};
    --re-wishlist-count-background: ${e.wishlist?.countBackground};
    --re-wishlist-count-color: ${e.wishlist?.countColor};
    --re-wishlist-button-size: ${e.wishlist?.buttonSize}${e.wishlist?.buttonSizeUnit};
    --re-wishlist-border-radius: ${e.wishlist?.borderRadius}${e.wishlist?.borderRadiusUnit};
    --re-wishlist-drawer-background: ${e.wishlist?.drawerBackground};
    --re-wishlist-drawer-header-background: ${e.wishlist?.drawerHeaderBackground};
    --re-wishlist-drawer-title-color: ${e.wishlist?.drawerTitleColor};
    --re-wishlist-drawer-max-width: ${e.wishlist?.drawerMaxWidth}${e.wishlist?.drawerMaxWidthUnit};
    --re-wishlist-card-min-width: ${e.wishlist?.cardMinWidth}${e.wishlist?.cardMinWidthUnit};
    --re-wishlist-card-gap: ${e.wishlist?.cardGap}${e.wishlist?.cardGapUnit};
    
    /* Legacy variables for backward compatibility */
    --re-accent-color: ${e.accentColor};
    --re-border-radius: ${e.borderRadius};
    --re-cards-per-row: ${e.cardsPerRow};
    --re-layout: ${e.layout};
}

/* Hover effects */
[style*="--re-card-hover-effect: lift"] .property-card-compact:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

[style*="--re-card-hover-effect: glow"] .property-card-compact:hover {
    box-shadow: 0 4px 20px rgba(26, 115, 232, 0.4);
}

/* Apply variables to admin interface */
.admin-container {
    --admin-primary: var(--re-accent-color);
}

.listing-grid {
    grid-template-columns: repeat(var(--re-cards-per-row), 1fr);
}

/* Badge colors using accent */
.listing-badge.badge-active {
    background: var(--re-accent-color);
}
`}const H={bed:`<svg class="property-detail-icon" width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_bed)">
          <path d="M2.05042 4.20617C2.0504 4.08346 2.02548 3.96204 1.97716 3.84924C1.92883 3.73645 1.85812 3.63463 1.7693 3.54997C1.68048 3.4653 1.57539 3.39955 1.46041 3.35668C1.34544 3.31382 1.22295 3.29474 1.10038 3.30059C0.864824 3.31599 0.644114 3.42104 0.483624 3.59415C0.323134 3.76726 0.23506 3.99528 0.237507 4.23133V16.3204H2.05101V12.6934H6.58359V9.06635H2.05042V4.20617ZM18.1508 5.8664H7.488V12.6934H19.5097V7.22594C19.5096 6.86552 19.3664 6.5199 19.1116 6.26498C18.8568 6.01007 18.5112 5.86671 18.1508 5.8664ZM21.2355 9.06635H20.4165V16.3204H22.23V10.0609C22.23 9.7971 22.1252 9.54414 21.9387 9.35764C21.7522 9.17113 21.4993 9.06635 21.2355 9.06635ZM4.88767 4.96375C4.51969 4.93967 4.1531 5.02836 3.83681 5.21797C3.52052 5.40759 3.26956 5.68912 3.11738 6.02503C2.9652 6.36094 2.91905 6.73527 2.98508 7.09808C3.05111 7.46089 3.22618 7.79496 3.48694 8.05572C3.7477 8.31648 4.08176 8.49155 4.44458 8.55758C4.80739 8.6236 5.18171 8.57745 5.51762 8.42528C5.85353 8.2731 6.13507 8.02213 6.32468 7.70584C6.5143 7.38955 6.60298 7.02297 6.57891 6.65498C6.55018 6.21588 6.36277 5.8022 6.05161 5.49104C5.74046 5.17989 5.32678 4.99248 4.88767 4.96375Z" fill="currentColor"/>
        </g>
        <defs>
          <clipPath id="clip0_bed">
            <rect width="22.23" height="19.89" fill="white"/>
          </clipPath>
        </defs>
      </svg>`,bath:`<svg class="property-detail-icon" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_bath)">
          <path d="M12.52 6.02353C12.4431 6.02344 12.3679 6.04615 12.3039 6.08881C12.2399 6.13146 12.19 6.19214 12.1605 6.26316C12.131 6.33418 12.1233 6.41235 12.1382 6.48778C12.1532 6.56321 12.1902 6.63252 12.2445 6.68693C12.2988 6.74133 12.3681 6.7784 12.4435 6.79344C12.5189 6.80848 12.5971 6.8008 12.6682 6.7714C12.7392 6.74199 12.8 6.69217 12.8427 6.62824C12.8854 6.56431 12.9082 6.48913 12.9082 6.41224C12.9082 6.30923 12.8673 6.21043 12.7945 6.13755C12.7217 6.06466 12.623 6.02365 12.52 6.02353ZM10.967 4.85788C10.8902 4.85788 10.815 4.88068 10.7511 4.92339C10.6872 4.9661 10.6374 5.02681 10.6079 5.09784C10.5785 5.16886 10.5708 5.24702 10.5858 5.32242C10.6008 5.39782 10.6378 5.46708 10.6922 5.52145C10.7466 5.57581 10.8158 5.61283 10.8912 5.62783C10.9666 5.64282 11.0448 5.63513 11.1158 5.60571C11.1868 5.57629 11.2475 5.52646 11.2902 5.46254C11.333 5.39862 11.3558 5.32347 11.3558 5.24659C11.3559 5.19527 11.3458 5.14443 11.3262 5.097C11.3066 5.04958 11.2778 5.00651 11.2414 4.97029C11.2051 4.93406 11.1619 4.9054 11.1144 4.88594C11.0669 4.86649 11.016 4.85663 10.9647 4.85694L10.967 4.85788ZM10.7713 6.02353C10.6944 6.02353 10.6193 6.04633 10.5553 6.08904C10.4914 6.13175 10.4416 6.19246 10.4122 6.26348C10.3827 6.33451 10.375 6.41267 10.39 6.48807C10.405 6.56347 10.4421 6.63273 10.4964 6.68709C10.5508 6.74145 10.6201 6.77847 10.6955 6.79347C10.7709 6.80847 10.849 6.80077 10.92 6.77135C10.9911 6.74193 11.0518 6.69211 11.0945 6.62819C11.1372 6.56427 11.16 6.48911 11.16 6.41224C11.16 6.30914 11.119 6.21028 11.0461 6.13738C10.9732 6.06448 10.8744 6.02353 10.7713 6.02353ZM12.52 4.85788C12.4431 4.85779 12.3679 4.88051 12.3039 4.92316C12.2399 4.96582 12.19 5.02649 12.1605 5.09751C12.131 5.16853 12.1233 5.2467 12.1382 5.32213C12.1532 5.39757 12.1902 5.46687 12.2445 5.52128C12.2988 5.57569 12.3681 5.61275 12.4435 5.62779C12.5189 5.64283 12.5971 5.63516 12.6682 5.60575C12.7392 5.57634 12.8 5.52652 12.8427 5.46259C12.8854 5.39866 12.9082 5.32349 12.9082 5.24659C12.9083 5.1955 12.8984 5.1449 12.879 5.09766C12.8595 5.05042 12.8309 5.00748 12.7949 4.97129C12.7588 4.9351 12.716 4.90638 12.6688 4.88676C12.6216 4.86713 12.5711 4.857 12.52 4.85694V4.85788ZM14.6569 3.69224H10.1887C10.1365 3.69042 10.0846 3.69912 10.0358 3.71783C9.98713 3.73653 9.94268 3.76486 9.90514 3.80111C9.86761 3.83736 9.83775 3.8808 9.81736 3.92884C9.79698 3.97687 9.78647 4.02852 9.78647 4.08071C9.78647 4.13289 9.79698 4.18454 9.81736 4.23258C9.83775 4.28061 9.86761 4.32405 9.90514 4.3603C9.94268 4.39656 9.98713 4.42488 10.0358 4.44358C10.0846 4.46229 10.1365 4.47099 10.1887 4.46918H14.6569C14.7091 4.47099 14.7611 4.46229 14.8098 4.44358C14.8585 4.42488 14.903 4.39656 14.9405 4.3603C14.978 4.32405 15.0079 4.28061 15.0283 4.23258C15.0487 4.18454 15.0592 4.13289 15.0592 4.08071C15.0592 4.02852 15.0487 3.97687 15.0283 3.92884C15.0079 3.8808 14.978 3.83736 14.9405 3.80111C14.903 3.76486 14.8585 3.73653 14.8098 3.71783C14.7611 3.69912 14.7091 3.69042 14.6569 3.69224ZM14.4626 2.8562e-07C14.0191 -0.000203038 13.5824 0.108152 13.1904 0.315604C12.7985 0.523057 12.4633 0.823299 12.2141 1.19012C11.7059 1.26321 11.241 1.51699 10.9046 1.90496C10.5682 2.29293 10.3829 2.78911 10.3826 3.30259H14.6569C14.6567 2.84062 14.5068 2.39116 14.2296 2.02159C13.9525 1.65202 13.563 1.38224 13.1195 1.25271C13.4855 0.915486 13.9649 0.728338 14.4626 0.728471C15.4136 0.728471 16.4052 1.41459 16.4052 2.72V7.19059H17.1826V2.72C17.1826 1.99861 16.896 1.30677 16.3859 0.79667C15.8758 0.286571 15.184 2.8562e-07 14.4626 2.8562e-07ZM14.6569 6.41129C14.657 6.3344 14.6343 6.2592 14.5917 6.19521C14.549 6.13123 14.4883 6.08133 14.4173 6.05184C14.3463 6.02235 14.2681 6.01459 14.1927 6.02953C14.1172 6.04448 14.0479 6.08146 13.9935 6.1358C13.9391 6.19014 13.9021 6.2594 13.887 6.33482C13.872 6.41023 13.8797 6.48841 13.9091 6.55947C13.9385 6.63052 13.9883 6.69126 14.0522 6.73399C14.1162 6.77672 14.1913 6.79953 14.2682 6.79953C14.3712 6.79953 14.47 6.75864 14.5429 6.68585C14.6158 6.61305 14.6568 6.5143 14.6569 6.41129ZM14.4626 5.24565C14.4627 5.16875 14.44 5.09355 14.3973 5.02957C14.3546 4.96558 14.294 4.91569 14.223 4.8862C14.1519 4.8567 14.0738 4.84894 13.9983 4.86388C13.9229 4.87883 13.8536 4.91581 13.7992 4.97015C13.7448 5.0245 13.7077 5.09376 13.6927 5.16917C13.6776 5.24459 13.6853 5.32277 13.7147 5.39382C13.7441 5.46487 13.7939 5.52561 13.8579 5.56834C13.9218 5.61107 13.997 5.63388 14.0739 5.63388C14.1769 5.63388 14.2757 5.593 14.3486 5.5202C14.4214 5.44741 14.4625 5.34866 14.4626 5.24565Z" fill="currentColor"/>
          <path d="M0.696 11.1271C0.696059 11.7398 0.858042 12.3416 1.16554 12.8716C1.47305 13.4016 1.91514 13.8409 2.44706 14.145L1.55765 15.0344C1.45156 15.1405 1.39196 15.2844 1.39196 15.4344C1.39196 15.5844 1.45156 15.7283 1.55765 15.8344C1.66373 15.9405 1.80762 16.0001 1.95765 16.0001C2.10768 16.0001 2.25156 15.9405 2.35765 15.8344L3.63106 14.561C3.81134 14.591 3.99371 14.6067 4.17647 14.608H13.7054C13.8882 14.6067 14.0705 14.591 14.2508 14.561L15.5242 15.8344C15.6303 15.9405 15.7742 16.0001 15.9242 16.0001C16.0743 16.0001 16.2181 15.9405 16.3242 15.8344C16.4303 15.7283 16.4899 15.5844 16.4899 15.4344C16.4899 15.2844 16.4303 15.1405 16.3242 15.0344L15.4353 14.145C15.9673 13.8409 16.4095 13.4016 16.7171 12.8717C17.0247 12.3417 17.1867 11.7399 17.1868 11.1271V9.73462H0.696V11.1271ZM1.39247 7.99438H0.696C0.511409 7.99438 0.334379 8.06771 0.203854 8.19824C0.0733284 8.32876 0 8.50579 0 8.69038L0 9.03862H17.8824V8.69038C17.8824 8.50579 17.809 8.32876 17.6785 8.19824C17.548 8.06771 17.3709 7.99438 17.1864 7.99438H1.39247Z" fill="currentColor"/>
        </g>
        <defs>
          <clipPath id="clip0_bath">
            <rect width="17.8824" height="16" fill="white"/>
          </clipPath>
        </defs>
      </svg>`,sqft:`<svg class="property-detail-icon" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_area)">
          <path d="M0.364068 2.55358L0 2.18998L2.20217 -0.0117188L4.40387 2.18998L4.04073 2.55358C3.89182 2.70198 3.69015 2.78531 3.47991 2.78531C3.26967 2.78531 3.068 2.70198 2.91909 2.55358L2.20217 1.839L1.48758 2.55358C1.33859 2.70256 1.13652 2.78625 0.925826 2.78625C0.71513 2.78625 0.513062 2.70256 0.364068 2.55358Z" fill="currentColor"/>
          <path d="M16.8556 14.3663H1.54787V0.913574H2.85646V13.0577H16.8556V14.3663Z" fill="currentColor"/>
          <path d="M15.5792 15.9143L15.2156 15.5507C15.0672 15.4018 14.9839 15.2001 14.9839 14.9899C14.9839 14.7796 15.0672 14.578 15.2156 14.429L15.9302 13.7145L15.2156 12.9994C15.0672 12.8505 14.9839 12.6488 14.9839 12.4386C14.9839 12.2283 15.0672 12.0267 15.2156 11.8778L15.5792 11.5142L17.7809 13.7163L15.5792 15.9143Z" fill="currentColor"/>
          <path d="M16.1185 10.949H15.4848C15.3113 10.949 15.1448 10.8801 15.0221 10.7574C14.8994 10.6347 14.8305 10.4683 14.8305 10.2948C14.8305 10.1212 14.8994 9.9548 15.0221 9.8321C15.1448 9.70939 15.3113 9.64046 15.4848 9.64046H16.1185C16.3106 9.64046 16.4662 9.50025 16.4662 9.32359V8.70996C16.4662 8.53643 16.5352 8.37001 16.6579 8.2473C16.7806 8.1246 16.947 8.05566 17.1205 8.05566C17.2941 8.05566 17.4605 8.1246 17.5832 8.2473C17.7059 8.37001 17.7748 8.53643 17.7748 8.70996V9.32359C17.7748 10.22 17.0317 10.949 16.1185 10.949Z" fill="currentColor"/>
          <path d="M13.0635 10.9492H9.72655C9.55302 10.9492 9.3866 10.8803 9.2639 10.7576C9.14119 10.6349 9.07226 10.4684 9.07226 10.2949C9.07226 10.1214 9.14119 9.95497 9.2639 9.83226C9.3866 9.70956 9.55302 9.64062 9.72655 9.64062H13.0635C13.237 9.64063 13.4034 9.70956 13.5261 9.83226C13.6488 9.95497 13.7177 10.1214 13.7177 10.2949C13.7177 10.4684 13.6488 10.6349 13.5261 10.7576C13.4034 10.8803 13.237 10.9492 13.0635 10.9492Z" fill="currentColor"/>
          <path d="M7.25145 10.949H6.61772C5.70451 10.949 4.96142 10.22 4.96142 9.32359V8.70996C4.96142 8.53643 5.03035 8.37001 5.15306 8.2473C5.27576 8.1246 5.44218 8.05566 5.61571 8.05566C5.78924 8.05566 5.95566 8.1246 6.07837 8.2473C6.20107 8.37001 6.27001 8.53643 6.27001 8.70996V9.32359C6.27001 9.49838 6.4261 9.64046 6.61772 9.64046H7.25145C7.42498 9.64046 7.5914 9.70939 7.7141 9.8321C7.83681 9.9548 7.90574 10.1212 7.90574 10.2948C7.90574 10.4683 7.83681 10.6347 7.7141 10.7574C7.5914 10.8801 7.42498 10.949 7.25145 10.949Z" fill="currentColor"/>
          <path d="M5.61571 7.07806C5.44218 7.07806 5.27576 7.00913 5.15306 6.88642C5.03035 6.76372 4.96142 6.5973 4.96142 6.42377V4.51977C4.96142 4.34624 5.03035 4.17982 5.15306 4.05712C5.27576 3.93441 5.44218 3.86548 5.61571 3.86548C5.78924 3.86548 5.95566 3.93441 6.07837 4.05712C6.20107 4.17982 6.27001 4.34624 6.27001 4.51977V6.42377C6.27001 6.5973 6.20107 6.76372 6.07837 6.88642C5.95566 7.00913 5.78924 7.07806 5.61571 7.07806Z" fill="currentColor"/>
          <path d="M5.61571 2.88777C5.44218 2.88777 5.27576 2.81883 5.15306 2.69613C5.03035 2.57342 4.96142 2.407 4.96142 2.23347V1.61937C4.96142 0.723455 5.70451 -0.00561523 6.61772 -0.00561523H7.25145C7.42498 -0.00561523 7.5914 0.0633191 7.7141 0.186023C7.83681 0.308727 7.90574 0.475149 7.90574 0.648679C7.90574 0.822208 7.83681 0.988631 7.7141 1.11133C7.5914 1.23404 7.42498 1.30297 7.25145 1.30297H6.61772C6.4261 1.30297 6.27001 1.44318 6.27001 1.61937V2.23347C6.27001 2.407 6.20107 2.57342 6.07837 2.69613C5.95566 2.81883 5.78924 2.88777 5.61571 2.88777Z" fill="currentColor"/>
          <path d="M13.0102 1.30297H9.67421C9.50068 1.30297 9.33426 1.23404 9.21155 1.11133C9.08885 0.988631 9.01991 0.822208 9.01991 0.648679C9.01991 0.475149 9.08885 0.308727 9.21155 0.186023C9.33426 0.0633191 9.50068 -0.00561523 9.67421 -0.00561523H13.0111C13.1846 -0.00561523 13.3511 0.0633191 13.4738 0.186023C13.5965 0.308727 13.6654 0.475149 13.6654 0.648679C13.6654 0.822208 13.5965 0.988631 13.4738 1.11133C13.3511 1.23404 13.1846 1.30297 13.0111 1.30297H13.0102Z" fill="currentColor"/>
          <path d="M17.1205 2.88777C16.947 2.88777 16.7806 2.81883 16.6579 2.69613C16.5352 2.57342 16.4662 2.407 16.4662 2.23347V1.61937C16.4662 1.44505 16.3106 1.30297 16.1185 1.30297H15.4848C15.3113 1.30297 15.1448 1.23404 15.0221 1.11133C14.8994 0.988631 14.8305 0.822208 14.8305 0.648679C14.8305 0.475149 14.8994 0.308727 15.0221 0.186023C15.1448 0.0633191 15.3113 -0.00561523 15.4848 -0.00561523H16.1185C17.0317 -0.00561523 17.7748 0.723455 17.7748 1.61937V2.23347C17.7748 2.407 17.7059 2.57342 17.5832 2.69613C17.4605 2.81883 17.2941 2.88777 17.1205 2.88777Z" fill="currentColor"/>
          <path d="M17.1205 7.07806C16.947 7.07806 16.7806 7.00913 16.6579 6.88642C16.5352 6.76372 16.4662 6.5973 16.4662 6.42377V4.51977C16.4662 4.34624 16.5352 4.17982 16.6579 4.05712C16.7806 3.93441 16.947 3.86548 17.1205 3.86548C17.2941 3.86548 17.4605 3.93441 17.5832 4.05712C17.7059 4.17982 17.7748 4.34624 17.7748 4.51977V6.42377C17.7748 6.5973 17.7059 6.76372 17.5832 6.88642C17.4605 7.00913 17.2941 7.07806 17.1205 7.07806Z" fill="currentColor"/>
        </g>
        <defs>
          <clipPath id="clip0_area">
            <rect width="17.7594" height="15.89" fill="white"/>
          </clipPath>
        </defs>
      </svg>`,garage:`<svg class="property-detail-icon" width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_garage)">
          <path d="M15.259 16.9951C15.672 16.9496 15.976 16.5846 15.976 16.1691V15.3811C16.1907 15.3811 16.3966 15.2958 16.5484 15.144C16.7002 14.9922 16.7855 14.7863 16.7855 14.5716V11.3336C16.7856 11.2273 16.7647 11.122 16.724 11.0237C16.6834 10.9255 16.6237 10.8362 16.5486 10.761C16.4734 10.6858 16.3841 10.6262 16.2859 10.5856C16.1876 10.5449 16.0823 10.524 15.976 10.5241H15.863L14.741 6.75307C14.7142 6.67241 14.6627 6.60224 14.5938 6.55252C14.5248 6.5028 14.442 6.47605 14.357 6.47607H4.64301C4.55802 6.47605 4.47517 6.5028 4.40624 6.55252C4.33731 6.60224 4.2858 6.67241 4.25901 6.75307L3.13701 10.5241H3.02401C2.91768 10.524 2.81239 10.5449 2.71415 10.5856C2.61591 10.6262 2.52664 10.6858 2.45146 10.761C2.37628 10.8362 2.31665 10.9255 2.27599 11.0237C2.23534 11.122 2.21444 11.2273 2.21451 11.3336V14.5716C2.21451 14.7863 2.29979 14.9922 2.45161 15.144C2.60342 15.2958 2.80932 15.3811 3.02401 15.3811V16.1691C3.02401 16.5846 3.32801 16.9496 3.74101 16.9951C3.85423 17.0077 3.96884 16.9964 4.07737 16.9617C4.18589 16.9271 4.28589 16.8699 4.37083 16.794C4.45576 16.7181 4.52373 16.6251 4.57029 16.5211C4.61684 16.4171 4.64094 16.3045 4.64101 16.1906V15.3811H14.357V16.1906C14.357 16.3047 14.3812 16.4175 14.4279 16.5216C14.4745 16.6258 14.5427 16.7189 14.6279 16.7948C14.713 16.8708 14.8133 16.9279 14.922 16.9624C15.0308 16.9969 15.1456 17.008 15.259 16.9951ZM5.24701 7.69057H13.7535L14.5965 10.5241H4.40351L5.24701 7.69057ZM4.33051 13.4541C4.14334 13.4732 3.95485 13.4339 3.79091 13.3416C3.62696 13.2493 3.49562 13.1085 3.41492 12.9386C3.33421 12.7686 3.30811 12.5779 3.34019 12.3925C3.37226 12.2071 3.46095 12.0362 3.59407 11.9032C3.72719 11.7703 3.8982 11.6818 4.08362 11.6499C4.26905 11.6181 4.45979 11.6444 4.62964 11.7254C4.79949 11.8063 4.94012 11.9378 5.03223 12.1018C5.12433 12.2659 5.16337 12.4544 5.14401 12.6416C5.12236 12.8498 5.02967 13.0443 4.88152 13.1923C4.73337 13.3402 4.5388 13.4327 4.33051 13.4541ZM13.856 12.6406C13.8368 12.4534 13.8759 12.2649 13.9681 12.1009C14.0603 11.9369 14.201 11.8055 14.3709 11.7247C14.5408 11.6439 14.7316 11.6176 14.917 11.6496C15.1024 11.6816 15.2734 11.7701 15.4064 11.9032C15.5394 12.0362 15.628 12.2072 15.66 12.3926C15.6919 12.578 15.6657 12.7687 15.5849 12.9386C15.5041 13.1085 15.3727 13.2493 15.2087 13.3415C15.0447 13.4337 14.8562 13.4728 14.669 13.4536C14.4607 13.4321 14.2661 13.3396 14.1181 13.1915C13.97 13.0435 13.8774 12.8489 13.856 12.6406Z" fill="currentColor"/>
          <path d="M17.5905 5.8255L9.50001 1.581L1.40951 5.8255C1.31057 5.87775 1.20229 5.90994 1.09088 5.92025C0.97947 5.93055 0.867122 5.91876 0.760279 5.88554C0.653436 5.85233 0.554202 5.79835 0.468269 5.72669C0.382335 5.65504 0.311393 5.56713 0.259512 5.468L0.00601196 4.9805L9.50001 0L18.994 4.9805L18.7385 5.468C18.6866 5.56687 18.6158 5.65455 18.53 5.72603C18.4442 5.79751 18.3452 5.85139 18.2386 5.88459C18.132 5.91779 18.0199 5.92966 17.9087 5.91952C17.7975 5.90938 17.6894 5.87743 17.5905 5.8255Z" fill="currentColor"/>
        </g>
        <defs>
          <clipPath id="clip0_garage">
            <rect width="19" height="17" fill="white"/>
          </clipPath>
        </defs>
      </svg>`};function t1(e,t){if(!e){console.log("🎨 No gallery container found");return}if(!t||t.length===0){console.log("🎨 No images to render for gallery"),e.style.display="none";return}console.log("🎨 Populating gallery with images:",t);const o=t[0],r=t.slice(1,5);let l="<div data-gallery>";o&&(l+=`
    <div class="property-gallery-hero" style="background:#f0f0f0;position:relative;height:auto">
      <img src="${o}" alt="Property main image" data-gallery-index="0" style="width:100%;height:100%;object-fit:cover;cursor:pointer;opacity:0;transition:opacity 0.3s;display:block" onload="this.style.opacity='1'">
    </div>`),r.length>0&&(l+=`
    <div class="property-gallery-grid">`,r.forEach((a,s)=>{const i=s+1;l+=`
      <div class="property-gallery-grid-item" style="background:#f0f0f0;position:relative">
        <img src="${a}" alt="Property image ${s+1}" data-gallery-index="${i}" style="width:100%;height:100%;object-fit:cover;cursor:pointer;opacity:0;transition:opacity 0.3s" onload="this.style.opacity='1'">
      </div>`}),l+=`
    </div>`),l+=`
  </div>`,e.innerHTML=l,setTimeout(()=>{window.attachGalleryHandlers&&(console.log("🖼️ Attaching gallery modal handlers"),window.attachGalleryHandlers())},50)}async function o1(e,t,o=null){if(!e){console.log("🎨 No details container found");return}o||(o=await P()),console.log("🎨 Populating details from schema:",t);const r=[];if(t.numberOfBedrooms&&r.push(`
      <span class="property-detail-item">
        ${H.bed}
        <span class="property-detail-value">${t.numberOfBedrooms} beds</span>
      </span>`),t.numberOfBathroomsTotal&&r.push(`
      <span class="property-detail-item">
        ${H.bath}
        <span class="property-detail-value">${t.numberOfBathroomsTotal} baths</span>
      </span>`),t.floorSize&&t.floorSize.value){const l=parseInt(t.floorSize.value).toLocaleString();r.push(`
      <span class="property-detail-item">
        ${H.sqft}
        <span class="property-detail-value">${l} sqft</span>
      </span>`)}if(t.additionalProperty){const l=t.additionalProperty.find(a=>a.name==="Parking");l&&r.push(`
      <span class="property-detail-item">
        ${H.garage}
        <span class="property-detail-value">${l.value}</span>
      </span>`)}if(t.rentalFields){const l=o?.rentalPageFieldVisibility||{},a=t.rentalFields;if(console.log("🏠 Processing rental fields:",{rentalData:a,rentalFieldVisibility:l,hasSettings:!!o}),a.deposit&&l.deposit!==!1){const s=typeof a.deposit=="number"?`$${a.deposit.toLocaleString()}`:a.deposit;r.push(`
      <span class="property-detail-item">
        <span class="property-detail-value">Deposit: ${s}</span>
      </span>`)}if(a.leaseTerm&&l.leaseTerm!==!1&&r.push(`
      <span class="property-detail-item">
        <span class="property-detail-value">Lease: ${a.leaseTerm}</span>
      </span>`),a.availableFrom&&l.availableFrom!==!1&&r.push(`
      <span class="property-detail-item">
        <span class="property-detail-value">Available: ${a.availableFrom}</span>
      </span>`),a.furnished!==void 0&&l.furnished!==!1){const s=a.furnished?"Yes":"No";r.push(`
      <span class="property-detail-item">
        <span class="property-detail-value">Furnished: ${s}</span>
      </span>`)}if(a.petsAllowed!==void 0&&l.petsAllowed!==!1){const s=a.petsAllowed?"Yes":"No";r.push(`
      <span class="property-detail-item">
        <span class="property-detail-value">Pets Allowed: ${s}</span>
      </span>`)}if(a.catsAllowed!==void 0&&l.catsAllowed!==!1){const s=a.catsAllowed?"Yes":"No";r.push(`
      <span class="property-detail-item">
        <span class="property-detail-value">Cats Allowed: ${s}</span>
      </span>`)}if(a.dogsAllowed!==void 0&&l.dogsAllowed!==!1){const s=a.dogsAllowed?"Yes":"No";r.push(`
      <span class="property-detail-item">
        <span class="property-detail-value">Dogs Allowed: ${s}</span>
      </span>`)}a.utilitiesIncluded&&l.utilitiesIncluded!==!1&&r.push(`
      <span class="property-detail-item">
        <span class="property-detail-value">Utilities: ${a.utilitiesIncluded}</span>
      </span>`)}if(console.log("🔍 Custom fields debugging:",{hasSettings:!!o,hasCustomFieldsInSettings:!!o?.customFields,customFieldsCount:o?.customFields?.length||0,hasCustomFieldsInSchema:!!t.customFields,schemaCustomFields:t.customFields}),o?.customFields&&t.customFields){console.log("🔍 Processing custom fields...");const l=o.customFields.filter(a=>{const s=a.visibleOnPage!==!1;return console.log(`🔍 Field ${a.name}: visible=${s}`),s}).map(a=>{let s=t.customFields[a.id];if(typeof s=="boolean"?s=s?"Yes":"No":(s==="true"||s==="false")&&(s=s==="true"?"Yes":"No"),console.log(`🔍 Field ${a.name}: value="${s}"`),!s||s===""||s==="No")return"";let i="";a.iconUrl&&a.iconUrl.startsWith("http")&&(i=`<img src="${a.iconUrl}" alt="${a.name}" class="property-detail-icon" />`);const n=i?`
      <span class="property-detail-item">
        ${i}
        <span class="property-detail-value">${s}</span>
      </span>`:`
      <span class="property-detail-item">
        <span class="property-detail-value">${a.name}: ${s}</span>
      </span>`;return console.log(`🔍 Generated HTML for ${a.name}:`,n),n}).filter(a=>a);console.log("🔍 Total custom fields HTML generated:",l.length),r.push(...l)}else console.log("⚠️ Custom fields not rendered:",{noSettings:!o?.customFields,noSchemaFields:!t.customFields});console.log("🔍 Total details items:",r.length),r.length>0?e.innerHTML=r.join(""):e.style.display="none"}function r1(e,t){if(!e){console.log("🎨 No description container found");return}if(!t){e.style.display="none";return}console.log("🎨 Populating description");const r=`
      <h3>Description</h3>
      <div class="property-description">
        ${t.split(`
`).filter(l=>l.trim()).map(l=>`<p>${l}</p>`).join(`
        `)}
      </div>`;e.innerHTML=r}function a1(e,t){if(!e){console.log("🎨 No map container found");return}console.log("🎨 Populating map from schema:",t);const o=t.geo?.latitude||"40.7207559",r=t.geo?.longitude||"-74.0007613",l=t.address;let a="";if(l){const i=l.streetAddress||"",p=[l.addressLocality,l.addressRegion,l.postalCode].filter(Boolean).join(", ");(i||p)&&(a=`<p class="property-address">${i}${p?"<br>"+p:""}</p>`)}const s=`
    <h3>Location</h3>
    ${a}
    <div id="property-map" class="property-map" 
         data-lat="${o}" 
         data-lng="${r}" 
         data-zoom="15"
         style="width:100%;height:400px;border-radius:8px;background:#f0f0f0;position:relative">
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;color:#666">
        Loading map...
      </div>
    </div>`;e.innerHTML=s,setTimeout(()=>{document.getElementById("property-map")&&window.initPropertyMapNow&&(console.log("🗺️ Calling map initialization"),window.initPropertyMapNow())},100)}async function l1(e){console.log("🎨 Populating property listing skeleton from schema");const t=e.querySelector('script[type="application/ld+json"]');if(!t){console.error("❌ No schema script found in container");return}let o;try{o=JSON.parse(t.textContent),console.log("✅ Parsed schema:",o)}catch(i){console.error("❌ Failed to parse schema JSON:",i);return}const r=e.querySelector("[data-gallery-container]"),l=e.querySelector("[data-details-container]"),a=e.querySelector("[data-description-container]"),s=e.querySelector("[data-map-container]");console.log("🎨 Found containers:",{gallery:!!r,details:!!l,description:!!a,map:!!s}),o.image&&o.image.length>0&&t1(r,o.image),await o1(l,o),o.description&&r1(a,o.description),a1(s,o),console.log("✅ Property listing populated")}function i1(e,t="500w"){if(!e)return"";try{if(new URL(e).pathname.endsWith("/"))return""}catch{if(e.endsWith("/"))return""}if(e.includes("/content/v1/")&&(e=e.replace("/content/v1/","/content/")),e.includes("squarespace-cdn.com")||e.includes("/content/")){const o=e.replace(/\+/g,"%20"),r=new URL(o),l=typeof t=="number"?`${t}w`:t;return r.searchParams.set("format",l),r.toString()}return e}function s1(e,t){let o=0;if(console.log("🔍 Comparing:",{current:{city:e.city,state:e.state,type:e.propertyType,price:e.price},compare:{city:t.city,state:t.state,type:t.propertyType,price:t.price}}),e.city&&t.city&&e.city.toLowerCase()===t.city.toLowerCase()&&(o+=5),e.state&&t.state&&e.state.toLowerCase()===t.state.toLowerCase()&&(o+=3),e.propertyType&&t.propertyType&&e.propertyType===t.propertyType&&(o+=4),e.price&&t.price){const r=Number(e.price),l=Number(t.price),a=Math.abs(r-l)/r;a<=.2?o+=3:a<=.4&&(o+=1)}return e.bedrooms&&t.bedrooms&&Math.abs(Number(e.bedrooms)-Number(t.bedrooms))<=1&&(o+=2),e.bathrooms&&t.bathrooms&&Math.abs(Number(e.bathrooms)-Number(t.bathrooms))<=1&&(o+=1),e.status&&t.status&&e.status===t.status&&(o+=2),o}async function n1(e,t){try{console.log("🔗 Fetching related properties for:",e.name);let o=window.Static?.SQUARESPACE_CONTEXT?.collection?.fullUrl;if(o)console.log("🔗 Collection URL from Static context:",o);else{const i=window.location.pathname.split("/").filter(Boolean);if(i.length>=2)o="/"+i[0],console.log("🔗 Constructed collection URL from path:",o);else return console.warn("🔗 Could not determine collection URL"),[]}console.log("🔗 Fetching from:",`${o}?format=json`);const r=await fetch(`${o}?format=json`,{headers:{Accept:"application/json"}});if(!r.ok)throw new Error(`Failed to fetch properties: ${r.status}`);const l=await r.json();console.log("🔗 Fetched collection data:",l);const a=l.items||[];console.log("🔗 Total properties in collection:",a.length);const s=a.map(i=>{let n={};try{i.excerpt&&(n=JSON.parse(i.excerpt))}catch(y){return console.warn("Could not parse property data:",y),null}if(i.id===e.id||i.urlId===e.id)return console.log("🔗 Excluding current property:",i.id),null;const p=n.status==="Sold"||n.status==="Rented",m=e.status==="Sold"||e.status==="Rented";if(p&&!m)return console.log("🔗 Excluding archived property:",i.title),null;const f=s1(e,n);return console.log("🔗 Property:",i.title,"Score:",f),{...i,propertyData:n,score:f}}).filter(i=>i!==null).sort((i,n)=>n.score-i.score).slice(0,3);return console.log("🔗 Found",s.length,"related properties"),s}catch(o){return console.error("Error fetching related properties:",o),[]}}function c1(e,t){const{propertyData:o,fullUrl:r,assetUrl:l}=e,a=i1(l,"500w"),s=o.title||e.title||"Property",i=o.price||o.rentAmount||0,n=o.bedrooms||o.beds||0,p=o.bathrooms||o.baths||0,m=o.squareFeet||o.sqft||0,f=o.status==="For Rent"||o.status==="Rented",y=o.rentPeriod||"monthly",$=i===0?"TBA":`$${Number(i).toLocaleString()}`,S=y==="weekly"?"week":y==="yearly"?"year":"month",c=m>0?`${Number(m).toLocaleString()} sq ft`:"",d=o.city||"",g=o.state||"",w=[d,g].filter(Boolean).join(", ");return`
        <a href="${r}" class="property-card-compact">
            <div class="property-card-compact__image-wrapper">
                ${a?`<img src="${a}" alt="${s}" class="property-image" loading="lazy">`:`<div class="property-image property-image--large">
                        <div class="property-image__placeholder">
                            <span class="property-image__placeholder-icon"><svg width="118" height="98" viewBox="0 0 118 98" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.25 93.8139H14.3333M14.3333 93.8139H47.5833M14.3333 93.8139V46.4446C14.3333 43.4834 14.3333 42.0021 14.6934 40.6242C15.0125 39.4031 15.5403 38.2476 16.2491 37.2034C17.049 36.0251 18.1606 35.048 20.3891 33.098L46.9979 9.81535C51.1291 6.20053 53.1949 4.393 55.5213 3.70501C57.5728 3.09833 59.7594 3.09833 61.8109 3.70501C64.1391 4.39352 66.2078 6.20274 70.3453 9.82303L96.9453 33.098C99.1737 35.0479 100.286 36.0251 101.086 37.2034C101.795 38.2476 102.318 39.4031 102.637 40.6242C102.997 42.0021 103 43.4834 103 46.4446V93.8139M47.5833 93.8139H69.75M47.5833 93.8139V71.6472C47.5833 65.5261 52.5455 60.5639 58.6667 60.5639C64.7878 60.5639 69.75 65.5261 69.75 71.6472V93.8139M69.75 93.8139H103M103 93.8139H114.083" stroke="white" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg></span>
                        </div>
                    </div>`}
                ${e.status==="Sold"?'<div class="property-card-compact__status-badge property-card-compact__status-badge--sold">Sold</div>':""}
                ${e.status==="Rented"?'<div class="property-card-compact__status-badge property-card-compact__status-badge--rented">Rented</div>':""}
            </div>
            
            <div class="property-card-compact__content">
                <div class="property-card-compact__header">
                    <h3 class="property-card-compact__title">${s}</h3>
                    ${w?`<div class="property-address property-address--compact">
                        <span class="property-address__text">${w}</span>
                    </div>`:""}
                </div>
                
                <div class="property-price property-price--block">
                    <span class="property-price__value">${$}</span>
                    ${f?`<span class="property-price__period">/ ${S}</span>`:""}
                </div>
                
                <div class="property-details property-details--horizontal">
                    ${n>0?`<span class="property-details__item">
                        <svg class="property-details__icon" width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_bed)">
          <path d="M2.05042 4.20617C2.0504 4.08346 2.02548 3.96204 1.97716 3.84924C1.92883 3.73645 1.85812 3.63463 1.7693 3.54997C1.68048 3.4653 1.57539 3.39955 1.46041 3.35668C1.34544 3.31382 1.22295 3.29474 1.10038 3.30059C0.864824 3.31599 0.644114 3.42104 0.483624 3.59415C0.323134 3.76726 0.23506 3.99528 0.237507 4.23133V16.3204H2.05101V12.6934H6.58359V9.06635H2.05042V4.20617ZM18.1508 5.8664H7.488V12.6934H19.5097V7.22594C19.5096 6.86552 19.3664 6.5199 19.1116 6.26498C18.8568 6.01007 18.5112 5.86671 18.1508 5.8664ZM21.2355 9.06635H20.4165V16.3204H22.23V10.0609C22.23 9.7971 22.1252 9.54414 21.9387 9.35764C21.7522 9.17113 21.4993 9.06635 21.2355 9.06635ZM4.88767 4.96375C4.51969 4.93967 4.1531 5.02836 3.83681 5.21797C3.52052 5.40759 3.26956 5.68912 3.11738 6.02503C2.9652 6.36094 2.91905 6.73527 2.98508 7.09808C3.05111 7.46089 3.22618 7.79496 3.48694 8.05572C3.7477 8.31648 4.08176 8.49155 4.44458 8.55758C4.80739 8.6236 5.18171 8.57745 5.51762 8.42528C5.85353 8.2731 6.13507 8.02213 6.32468 7.70584C6.5143 7.38955 6.60298 7.02297 6.57891 6.65498C6.55018 6.21588 6.36277 5.8022 6.05161 5.49104C5.74046 5.17989 5.32678 4.99248 4.88767 4.96375Z" fill="currentColor"/>
        </g>
        <defs>
          <clipPath id="clip0_bed">
            <rect width="22.23" height="19.89" fill="white"/>
          </clipPath>
        </defs>
      </svg>
                        <span class="property-details__value">${n}</span>
                    </span>`:""}
                    ${p>0?`<span class="property-details__item">
                        <svg class="property-details__icon" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_bath)">
          <path d="M12.52 6.02353C12.4431 6.02344 12.3679 6.04615 12.3039 6.08881C12.2399 6.13146 12.19 6.19214 12.1605 6.26316C12.131 6.33418 12.1233 6.41235 12.1382 6.48778C12.1532 6.56321 12.1902 6.63252 12.2445 6.68693C12.2988 6.74133 12.3681 6.7784 12.4435 6.79344C12.5189 6.80848 12.5971 6.8008 12.6682 6.7714C12.7392 6.74199 12.8 6.69217 12.8427 6.62824C12.8854 6.56431 12.9082 6.48913 12.9082 6.41224C12.9082 6.30923 12.8673 6.21043 12.7945 6.13755C12.7217 6.06466 12.623 6.02365 12.52 6.02353ZM10.967 4.85788C10.8902 4.85788 10.815 4.88068 10.7511 4.92339C10.6872 4.9661 10.6374 5.02681 10.6079 5.09784C10.5785 5.16886 10.5708 5.24702 10.5858 5.32242C10.6008 5.39782 10.6378 5.46708 10.6922 5.52145C10.7466 5.57581 10.8158 5.61283 10.8912 5.62783C10.9666 5.64282 11.0448 5.63513 11.1158 5.60571C11.1868 5.57629 11.2475 5.52646 11.2902 5.46254C11.333 5.39862 11.3558 5.32347 11.3558 5.24659C11.3559 5.19527 11.3458 5.14443 11.3262 5.097C11.3066 5.04958 11.2778 5.00651 11.2414 4.97029C11.2051 4.93406 11.1619 4.9054 11.1144 4.88594C11.0669 4.86649 11.016 4.85663 10.9647 4.85694L10.967 4.85788ZM10.7713 6.02353C10.6944 6.02353 10.6193 6.04633 10.5553 6.08904C10.4914 6.13175 10.4416 6.19246 10.4122 6.26348C10.3827 6.33451 10.375 6.41267 10.39 6.48807C10.405 6.56347 10.4421 6.63273 10.4964 6.68709C10.5508 6.74145 10.6201 6.77847 10.6955 6.79347C10.7709 6.80847 10.849 6.80077 10.92 6.77135C10.9911 6.74193 11.0518 6.69211 11.0945 6.62819C11.1372 6.56427 11.16 6.48911 11.16 6.41224C11.16 6.30914 11.119 6.21028 11.0461 6.13738C10.9732 6.06448 10.8744 6.02353 10.7713 6.02353ZM12.52 4.85788C12.4431 4.85779 12.3679 4.88051 12.3039 4.92316C12.2399 4.96582 12.19 5.02649 12.1605 5.09751C12.131 5.16853 12.1233 5.2467 12.1382 5.32213C12.1532 5.39757 12.1902 5.46687 12.2445 5.52128C12.2988 5.57569 12.3681 5.61275 12.4435 5.62779C12.5189 5.64283 12.5971 5.63516 12.6682 5.60575C12.7392 5.57634 12.8 5.52652 12.8427 5.46259C12.8854 5.39866 12.9082 5.32349 12.9082 5.24659C12.9083 5.1955 12.8984 5.1449 12.879 5.09766C12.8595 5.05042 12.8309 5.00748 12.7949 4.97129C12.7588 4.9351 12.716 4.90638 12.6688 4.88676C12.6216 4.86713 12.5711 4.857 12.52 4.85694V4.85788ZM14.6569 3.69224H10.1887C10.1365 3.69042 10.0846 3.69912 10.0358 3.71783C9.98713 3.73653 9.94268 3.76486 9.90514 3.80111C9.86761 3.83736 9.83775 3.8808 9.81736 3.92884C9.79698 3.97687 9.78647 4.02852 9.78647 4.08071C9.78647 4.13289 9.79698 4.18454 9.81736 4.23258C9.83775 4.28061 9.86761 4.32405 9.90514 4.3603C9.94268 4.39656 9.98713 4.42488 10.0358 4.44358C10.0846 4.46229 10.1365 4.47099 10.1887 4.46918H14.6569C14.7091 4.47099 14.7611 4.46229 14.8098 4.44358C14.8585 4.42488 14.903 4.39656 14.9405 4.3603C14.978 4.32405 15.0079 4.28061 15.0283 4.23258C15.0487 4.18454 15.0592 4.13289 15.0592 4.08071C15.0592 4.02852 15.0487 3.97687 15.0283 3.92884C15.0079 3.8808 14.978 3.83736 14.9405 3.80111C14.903 3.76486 14.8585 3.73653 14.8098 3.71783C14.7611 3.69912 14.7091 3.69042 14.6569 3.69224ZM14.4626 2.8562e-07C14.0191 -0.000203038 13.5824 0.108152 13.1904 0.315604C12.7985 0.523057 12.4633 0.823299 12.2141 1.19012C11.7059 1.26321 11.241 1.51699 10.9046 1.90496C10.5682 2.29293 10.3829 2.78911 10.3826 3.30259H14.6569C14.6567 2.84062 14.5068 2.39116 14.2296 2.02159C13.9525 1.65202 13.563 1.38224 13.1195 1.25271C13.4855 0.915486 13.9649 0.728338 14.4626 0.728471C15.4136 0.728471 16.4052 1.41459 16.4052 2.72V7.19059H17.1826V2.72C17.1826 1.99861 16.896 1.30677 16.3859 0.79667C15.8758 0.286571 15.184 2.8562e-07 14.4626 2.8562e-07ZM14.6569 6.41129C14.657 6.3344 14.6343 6.2592 14.5917 6.19521C14.549 6.13123 14.4883 6.08133 14.4173 6.05184C14.3463 6.02235 14.2681 6.01459 14.1927 6.02953C14.1172 6.04448 14.0479 6.08146 13.9935 6.1358C13.9391 6.19014 13.9021 6.2594 13.887 6.33482C13.872 6.41023 13.8797 6.48841 13.9091 6.55947C13.9385 6.63052 13.9883 6.69126 14.0522 6.73399C14.1162 6.77672 14.1913 6.79953 14.2682 6.79953C14.3712 6.79953 14.47 6.75864 14.5429 6.68585C14.6158 6.61305 14.6568 6.5143 14.6569 6.41129ZM14.4626 5.24565C14.4627 5.16875 14.44 5.09355 14.3973 5.02957C14.3546 4.96558 14.294 4.91569 14.223 4.8862C14.1519 4.8567 14.0738 4.84894 13.9983 4.86388C13.9229 4.87883 13.8536 4.91581 13.7992 4.97015C13.7448 5.0245 13.7077 5.09376 13.6927 5.16917C13.6776 5.24459 13.6853 5.32277 13.7147 5.39382C13.7441 5.46487 13.7939 5.52561 13.8579 5.56834C13.9218 5.61107 13.997 5.63388 14.0739 5.63388C14.1769 5.63388 14.2757 5.593 14.3486 5.5202C14.4214 5.44741 14.4625 5.34866 14.4626 5.24565Z" fill="currentColor"/>
          <path d="M0.696 11.1271C0.696059 11.7398 0.858042 12.3416 1.16554 12.8716C1.47305 13.4016 1.91514 13.8409 2.44706 14.145L1.55765 15.0344C1.45156 15.1405 1.39196 15.2844 1.39196 15.4344C1.39196 15.5844 1.45156 15.7283 1.55765 15.8344C1.66373 15.9405 1.80762 16.0001 1.95765 16.0001C2.10768 16.0001 2.25156 15.9405 2.35765 15.8344L3.63106 14.561C3.81134 14.591 3.99371 14.6067 4.17647 14.608H13.7054C13.8882 14.6067 14.0705 14.591 14.2508 14.561L15.5242 15.8344C15.6303 15.9405 15.7742 16.0001 15.9242 16.0001C16.0743 16.0001 16.2181 15.9405 16.3242 15.8344C16.4303 15.7283 16.4899 15.5844 16.4899 15.4344C16.4899 15.2844 16.4303 15.1405 16.3242 15.0344L15.4353 14.145C15.9673 13.8409 16.4095 13.4016 16.7171 12.8717C17.0247 12.3417 17.1867 11.7399 17.1868 11.1271V9.73462H0.696V11.1271ZM1.39247 7.99438H0.696C0.511409 7.99438 0.334379 8.06771 0.203854 8.19824C0.0733284 8.32876 0 8.50579 0 8.69038L0 9.03862H17.8824V8.69038C17.8824 8.50579 17.809 8.32876 17.6785 8.19824C17.548 8.06771 17.3709 7.99438 17.1864 7.99438H1.39247Z" fill="currentColor"/>
        </g>
        <defs>
          <clipPath id="clip0_bath">
            <rect width="17.8824" height="16" fill="white"/>
          </clipPath>
        </defs>
      </svg>
                        <span class="property-details__value">${p}</span>
                    </span>`:""}
                    ${c?`<span class="property-details__item">
                        <svg class="property-details__icon" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_area)">
          <path d="M0.364068 2.55358L0 2.18998L2.20217 -0.0117188L4.40387 2.18998L4.04073 2.55358C3.89182 2.70198 3.69015 2.78531 3.47991 2.78531C3.26967 2.78531 3.068 2.70198 2.91909 2.55358L2.20217 1.839L1.48758 2.55358C1.33859 2.70256 1.13652 2.78625 0.925826 2.78625C0.71513 2.78625 0.513062 2.70256 0.364068 2.55358Z" fill="currentColor"/>
          <path d="M16.8556 14.3663H1.54787V0.913574H2.85646V13.0577H16.8556V14.3663Z" fill="currentColor"/>
          <path d="M15.5792 15.9143L15.2156 15.5507C15.0672 15.4018 14.9839 15.2001 14.9839 14.9899C14.9839 14.7796 15.0672 14.578 15.2156 14.429L15.9302 13.7145L15.2156 12.9994C15.0672 12.8505 14.9839 12.6488 14.9839 12.4386C14.9839 12.2283 15.0672 12.0267 15.2156 11.8778L15.5792 11.5142L17.7809 13.7163L15.5792 15.9143Z" fill="currentColor"/>
          <path d="M16.1185 10.949H15.4848C15.3113 10.949 15.1448 10.8801 15.0221 10.7574C14.8994 10.6347 14.8305 10.4683 14.8305 10.2948C14.8305 10.1212 14.8994 9.9548 15.0221 9.8321C15.1448 9.70939 15.3113 9.64046 15.4848 9.64046H16.1185C16.3106 9.64046 16.4662 9.50025 16.4662 9.32359V8.70996C16.4662 8.53643 16.5352 8.37001 16.6579 8.2473C16.7806 8.1246 16.947 8.05566 17.1205 8.05566C17.2941 8.05566 17.4605 8.1246 17.5832 8.2473C17.7059 8.37001 17.7748 8.53643 17.7748 8.70996V9.32359C17.7748 10.22 17.0317 10.949 16.1185 10.949Z" fill="currentColor"/>
          <path d="M13.0635 10.9492H9.72655C9.55302 10.9492 9.3866 10.8803 9.2639 10.7576C9.14119 10.6349 9.07226 10.4684 9.07226 10.2949C9.07226 10.1214 9.14119 9.95497 9.2639 9.83226C9.3866 9.70956 9.55302 9.64062 9.72655 9.64062H13.0635C13.237 9.64063 13.4034 9.70956 13.5261 9.83226C13.6488 9.95497 13.7177 10.1214 13.7177 10.2949C13.7177 10.4684 13.6488 10.6349 13.5261 10.7576C13.4034 10.8803 13.237 10.9492 13.0635 10.9492Z" fill="currentColor"/>
          <path d="M7.25145 10.949H6.61772C5.70451 10.949 4.96142 10.22 4.96142 9.32359V8.70996C4.96142 8.53643 5.03035 8.37001 5.15306 8.2473C5.27576 8.1246 5.44218 8.05566 5.61571 8.05566C5.78924 8.05566 5.95566 8.1246 6.07837 8.2473C6.20107 8.37001 6.27001 8.53643 6.27001 8.70996V9.32359C6.27001 9.49838 6.4261 9.64046 6.61772 9.64046H7.25145C7.42498 9.64046 7.5914 9.70939 7.7141 9.8321C7.83681 9.9548 7.90574 10.1212 7.90574 10.2948C7.90574 10.4683 7.83681 10.6347 7.7141 10.7574C7.5914 10.8801 7.42498 10.949 7.25145 10.949Z" fill="currentColor"/>
          <path d="M5.61571 7.07806C5.44218 7.07806 5.27576 7.00913 5.15306 6.88642C5.03035 6.76372 4.96142 6.5973 4.96142 6.42377V4.51977C4.96142 4.34624 5.03035 4.17982 5.15306 4.05712C5.27576 3.93441 5.44218 3.86548 5.61571 3.86548C5.78924 3.86548 5.95566 3.93441 6.07837 4.05712C6.20107 4.17982 6.27001 4.34624 6.27001 4.51977V6.42377C6.27001 6.5973 6.20107 6.76372 6.07837 6.88642C5.95566 7.00913 5.78924 7.07806 5.61571 7.07806Z" fill="currentColor"/>
          <path d="M5.61571 2.88777C5.44218 2.88777 5.27576 2.81883 5.15306 2.69613C5.03035 2.57342 4.96142 2.407 4.96142 2.23347V1.61937C4.96142 0.723455 5.70451 -0.00561523 6.61772 -0.00561523H7.25145C7.42498 -0.00561523 7.5914 0.0633191 7.7141 0.186023C7.83681 0.308727 7.90574 0.475149 7.90574 0.648679C7.90574 0.822208 7.83681 0.988631 7.7141 1.11133C7.5914 1.23404 7.42498 1.30297 7.25145 1.30297H6.61772C6.4261 1.30297 6.27001 1.44318 6.27001 1.61937V2.23347C6.27001 2.407 6.20107 2.57342 6.07837 2.69613C5.95566 2.81883 5.78924 2.88777 5.61571 2.88777Z" fill="currentColor"/>
          <path d="M13.0102 1.30297H9.67421C9.50068 1.30297 9.33426 1.23404 9.21155 1.11133C9.08885 0.988631 9.01991 0.822208 9.01991 0.648679C9.01991 0.475149 9.08885 0.308727 9.21155 0.186023C9.33426 0.0633191 9.50068 -0.00561523 9.67421 -0.00561523H13.0111C13.1846 -0.00561523 13.3511 0.0633191 13.4738 0.186023C13.5965 0.308727 13.6654 0.475149 13.6654 0.648679C13.6654 0.822208 13.5965 0.988631 13.4738 1.11133C13.3511 1.23404 13.1846 1.30297 13.0111 1.30297H13.0102Z" fill="currentColor"/>
          <path d="M17.1205 2.88777C16.947 2.88777 16.7806 2.81883 16.6579 2.69613C16.5352 2.57342 16.4662 2.407 16.4662 2.23347V1.61937C16.4662 1.44505 16.3106 1.30297 16.1185 1.30297H15.4848C15.3113 1.30297 15.1448 1.23404 15.0221 1.11133C14.8994 0.988631 14.8305 0.822208 14.8305 0.648679C14.8305 0.475149 14.8994 0.308727 15.0221 0.186023C15.1448 0.0633191 15.3113 -0.00561523 15.4848 -0.00561523H16.1185C17.0317 -0.00561523 17.7748 0.723455 17.7748 1.61937V2.23347C17.7748 2.407 17.7059 2.57342 17.5832 2.69613C17.4605 2.81883 17.2941 2.88777 17.1205 2.88777Z" fill="currentColor"/>
          <path d="M17.1205 7.07806C16.947 7.07806 16.7806 7.00913 16.6579 6.88642C16.5352 6.76372 16.4662 6.5973 16.4662 6.42377V4.51977C16.4662 4.34624 16.5352 4.17982 16.6579 4.05712C16.7806 3.93441 16.947 3.86548 17.1205 3.86548C17.2941 3.86548 17.4605 3.93441 17.5832 4.05712C17.7059 4.17982 17.7748 4.34624 17.7748 4.51977V6.42377C17.7748 6.5973 17.7059 6.76372 17.5832 6.88642C17.4605 7.00913 17.2941 7.07806 17.1205 7.07806Z" fill="currentColor"/>
        </g>
        <defs>
          <clipPath id="clip0_area">
            <rect width="17.7594" height="15.89" fill="white"/>
          </clipPath>
        </defs>
      </svg>
                        <span class="property-details__value">${c}</span>
                    </span>`:""}
                    ${d1(o.customFields,t)}
                </div>
            </div>
        </a>
    `}function d1(e,t){const o=t?.customFields||[];return!o.length||!e?"":o.filter(r=>r.visibleOnCard!==!1).map(r=>{const l=e[r.id];return!l||l===""||l==="No"?"":r.iconUrl?`<span class="property-details__item">
                <img src="${r.iconUrl}" alt="${r.name}" class="property-details__icon" />
                <span class="property-details__value">${l}</span>
            </span>`:`<span class="property-details__item">
                <span class="property-details__value">${r.name}: ${l}</span>
            </span>`}).filter(r=>r).join("")}async function p1(){console.log("🔗 injectRelatedProperties() called");const e=await P(),t=document.querySelector(".blog-item-wrapper article");if(console.log("🔗 Article element:",t),!t){console.log("🔗 No article element found, skipping related properties");return}const o=document.querySelectorAll('script[type="application/ld+json"]');console.log("🔗 Found schema scripts:",o.length);let r=null;for(const h of o)try{const C=JSON.parse(h.textContent);if(console.log("🔗 Checking schema type:",C["@type"]),C["@type"]==="RealEstateListing"){r=C,console.log("🔗 Found RealEstateListing schema:",r);break}}catch(C){console.warn("🔗 Could not parse schema:",C)}if(!r){console.log("🔗 No RealEstateListing schema found, skipping related properties");return}let l=null;if(window.Static?.SQUARESPACE_CONTEXT?.item?.collectionId?(l=window.Static.SQUARESPACE_CONTEXT.item.collectionId,console.log("🔗 Collection ID from Static.SQUARESPACE_CONTEXT.item:",l)):window.Static?.SQUARESPACE_CONTEXT?.collectionId?(l=window.Static.SQUARESPACE_CONTEXT.collectionId,console.log("🔗 Collection ID from Static.SQUARESPACE_CONTEXT:",l)):window.Static?.SQUARESPACE_CONTEXT?.collection?.id?(l=window.Static.SQUARESPACE_CONTEXT.collection.id,console.log("🔗 Collection ID from Static.SQUARESPACE_CONTEXT.collection:",l)):(console.warn("🔗 Could not find collection ID in Static.SQUARESPACE_CONTEXT"),console.log("🔗 Available context:",window.Static?.SQUARESPACE_CONTEXT)),console.log("🔗 Final collection ID:",l),!l){console.log("🔗 Could not determine collection ID, skipping related properties");return}const a=t.closest(".blog-item")?.dataset.itemId||document.body.dataset.itemId||window.location.pathname.split("/").filter(Boolean).pop();r.id=a,console.log("🔗 Property ID:",a);const s=window.Static?.SQUARESPACE_CONTEXT?.item;if(s?.excerpt)try{const h=JSON.parse(s.excerpt);console.log("🔗 Parsed excerpt data:",h),r={...r,...h,id:a,name:r.name,price:h.price||r.offers?.price}}catch(h){console.warn("🔗 Could not parse excerpt data:",h)}console.log("🔗 Final current property data:",r),console.log("🔗 Property location:",r.city,r.state),console.log("🔗 Fetching related properties...");const i=await n1(r);if(console.log("🔗 Related properties result:",i),i.length===0){console.log("🔗 No related properties found");return}const n=e?.relatedProperties||{},p=n.customTitle||"Related Properties",m=n.numberOfProperties||3,f=n.backgroundColor||"#fafafa",y=n.titleColor||"#333333",$=n.titleFontSize||28,S=n.titleFontSizeUnit||"px",c=n.titleFontWeight||"600",d=n.titleLineHeight||1.3,g=n.titleFontFamily||"heading",w=i.slice(0,m),M=document.createElement("div");M.className="related-properties-section",M.style.backgroundColor=f,M.innerHTML=`
        <div class="related-properties-header">
            <h3 style="color: ${y}; font-size: ${$}${S}; font-weight: ${c}; line-height: ${d}; font-family: var(--${g}-font-font-family, inherit);">${p}</h3>
        </div>
        <div class="related-properties-grid">
            ${w.map(h=>c1(h,e)).join("")}
        </div>
    `,t.insertAdjacentElement("afterend",M),console.log("🔗 Related properties section injected with settings:",{title:p,count:w.length,backgroundColor:f,titleColor:y})}const N="realEstateFavorites",Z="realEstateFavoritesAnalytics";function b(){try{const e=localStorage.getItem(N);return e?JSON.parse(e):[]}catch(e){return console.error("Error reading favorites:",e),[]}}function q(e){try{localStorage.setItem(N,JSON.stringify(e)),g1()}catch(t){console.error("Error saving favorites:",t)}}function k(e){return b().some(o=>o.url===e)}function C1(e){const t=b();if(t.some(r=>r.url===e.url))return!1;const o={...e,addedAt:Date.now()};return t.push(o),q(t),O("add",e),console.log("✅ Added to favorites:",e.title),!0}function B(e){let t=b();const o=t.length;if(t=t.filter(r=>r.url!==e),t.length<o){q(t);const r=b().find(l=>l.url===e);return r&&O("remove",r),console.log("❌ Removed from favorites:",e),!0}return!1}function u1(e){return k(e.url)?(B(e.url),!1):(C1(e),!0)}function z(){return b().length}function g1(){const e=new CustomEvent("favoritesChanged",{detail:{count:z(),favorites:b()}});window.dispatchEvent(e)}function O(e,t){try{const o=JSON.parse(localStorage.getItem(Z)||"{}");o.actions||(o.actions=[]),o.propertyStats||(o.propertyStats={}),o.actions.push({action:e,propertyUrl:t.url,propertyTitle:t.title,listingType:t.listingType,price:t.priceValue,timestamp:Date.now()}),o.propertyStats[t.url]||(o.propertyStats[t.url]={title:t.title,addCount:0,removeCount:0,lastAction:null});const r=o.propertyStats[t.url];e==="add"?r.addCount++:r.removeCount++,r.lastAction=Date.now(),o.actions.length>1e3&&(o.actions=o.actions.slice(-1e3)),localStorage.setItem(Z,JSON.stringify(o))}catch(o){console.error("Error tracking favorite action:",o)}}function I(e,t){return e?e.isRange?`${t(e.min)}-${t(e.max)}`:t(e.min):""}function h1(e,t,o="stacked"){const l="sq ft",a=[];if(e.categories.length>0&&a.push(`data-categories="${e.categories.join("|")}"`),e.tags.length>0&&a.push(`data-tags="${e.tags.join("|")}"`),e.listingType&&a.push(`data-listing-type="${e.listingType}"`),e.propertyType&&a.push(`data-property-type="${e.propertyType}"`),e.city&&a.push(`data-city="${e.city}"`),e.bedrooms)if(e.bedrooms.isRange){const c=[];for(let d=e.bedrooms.min;d<=e.bedrooms.max;d++)c.push(`bed-${d}`);a.push(`data-bedrooms="${c.join(" ")}"`)}else a.push(`data-bedrooms="bed-${e.bedroomsValue}"`);if(e.bathrooms)if(e.bathrooms.isRange){const c=[];for(let d=e.bathrooms.min;d<=e.bathrooms.max;d+=.5)c.push(`bath-${d}`);a.push(`data-bathrooms="${c.join(" ")}"`)}else a.push(`data-bathrooms="bath-${e.bathroomsValue}"`);if(e.garage)if(e.garage.isRange){const c=[];for(let d=e.garage.min;d<=e.garage.max;d++)c.push(`garage-${d}`);a.push(`data-garage="${c.join(" ")}"`)}else a.push(`data-garage="garage-${e.garageValue}"`);e.area&&(a.push(`data-area-min="${e.area.min}"`),a.push(`data-area-max="${e.area.max}"`)),e.price&&(a.push(`data-price-min="${e.price.min}"`),a.push(`data-price-max="${e.price.max}"`)),e.customFields&&Object.entries(e.customFields).forEach(([c,d])=>{d!=null&&d!==""&&(typeof d=="boolean"?a.push(`data-custom-${c}="custom-${c}-${d}"`):a.push(`data-custom-${c}="${d}"`))});const s=e.price?`$${I(e.price,c=>c.toLocaleString())}`:"Price TBA",i=e.area?`${I(e.area,c=>c.toLocaleString())} ${l}`:"",n=e.bedrooms?I(e.bedrooms,c=>c.toString()):"",p=e.bathrooms?I(e.bathrooms,c=>Number.isInteger(c)?c.toString():c.toFixed(1)):"",m=`<svg class="property-details__icon" width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_bed)">
          <path d="M2.05042 4.20617C2.0504 4.08346 2.02548 3.96204 1.97716 3.84924C1.92883 3.73645 1.85812 3.63463 1.7693 3.54997C1.68048 3.4653 1.57539 3.39955 1.46041 3.35668C1.34544 3.31382 1.22295 3.29474 1.10038 3.30059C0.864824 3.31599 0.644114 3.42104 0.483624 3.59415C0.323134 3.76726 0.23506 3.99528 0.237507 4.23133V16.3204H2.05101V12.6934H6.58359V9.06635H2.05042V4.20617ZM18.1508 5.8664H7.488V12.6934H19.5097V7.22594C19.5096 6.86552 19.3664 6.5199 19.1116 6.26498C18.8568 6.01007 18.5112 5.86671 18.1508 5.8664ZM21.2355 9.06635H20.4165V16.3204H22.23V10.0609C22.23 9.7971 22.1252 9.54414 21.9387 9.35764C21.7522 9.17113 21.4993 9.06635 21.2355 9.06635ZM4.88767 4.96375C4.51969 4.93967 4.1531 5.02836 3.83681 5.21797C3.52052 5.40759 3.26956 5.68912 3.11738 6.02503C2.9652 6.36094 2.91905 6.73527 2.98508 7.09808C3.05111 7.46089 3.22618 7.79496 3.48694 8.05572C3.7477 8.31648 4.08176 8.49155 4.44458 8.55758C4.80739 8.6236 5.18171 8.57745 5.51762 8.42528C5.85353 8.2731 6.13507 8.02213 6.32468 7.70584C6.5143 7.38955 6.60298 7.02297 6.57891 6.65498C6.55018 6.21588 6.36277 5.8022 6.05161 5.49104C5.74046 5.17989 5.32678 4.99248 4.88767 4.96375Z" fill="currentColor"/>
        </g>
        <defs>
          <clipPath id="clip0_bed">
            <rect width="22.23" height="19.89" fill="white"/>
          </clipPath>
        </defs>
      </svg>`,f=`<svg class="property-details__icon" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_bath)">
          <path d="M12.52 6.02353C12.4431 6.02344 12.3679 6.04615 12.3039 6.08881C12.2399 6.13146 12.19 6.19214 12.1605 6.26316C12.131 6.33418 12.1233 6.41235 12.1382 6.48778C12.1532 6.56321 12.1902 6.63252 12.2445 6.68693C12.2988 6.74133 12.3681 6.7784 12.4435 6.79344C12.5189 6.80848 12.5971 6.8008 12.6682 6.7714C12.7392 6.74199 12.8 6.69217 12.8427 6.62824C12.8854 6.56431 12.9082 6.48913 12.9082 6.41224C12.9082 6.30923 12.8673 6.21043 12.7945 6.13755C12.7217 6.06466 12.623 6.02365 12.52 6.02353ZM10.967 4.85788C10.8902 4.85788 10.815 4.88068 10.7511 4.92339C10.6872 4.9661 10.6374 5.02681 10.6079 5.09784C10.5785 5.16886 10.5708 5.24702 10.5858 5.32242C10.6008 5.39782 10.6378 5.46708 10.6922 5.52145C10.7466 5.57581 10.8158 5.61283 10.8912 5.62783C10.9666 5.64282 11.0448 5.63513 11.1158 5.60571C11.1868 5.57629 11.2475 5.52646 11.2902 5.46254C11.333 5.39862 11.3558 5.32347 11.3558 5.24659C11.3559 5.19527 11.3458 5.14443 11.3262 5.097C11.3066 5.04958 11.2778 5.00651 11.2414 4.97029C11.2051 4.93406 11.1619 4.9054 11.1144 4.88594C11.0669 4.86649 11.016 4.85663 10.9647 4.85694L10.967 4.85788ZM10.7713 6.02353C10.6944 6.02353 10.6193 6.04633 10.5553 6.08904C10.4914 6.13175 10.4416 6.19246 10.4122 6.26348C10.3827 6.33451 10.375 6.41267 10.39 6.48807C10.405 6.56347 10.4421 6.63273 10.4964 6.68709C10.5508 6.74145 10.6201 6.77847 10.6955 6.79347C10.7709 6.80847 10.849 6.80077 10.92 6.77135C10.9911 6.74193 11.0518 6.69211 11.0945 6.62819C11.1372 6.56427 11.16 6.48911 11.16 6.41224C11.16 6.30914 11.119 6.21028 11.0461 6.13738C10.9732 6.06448 10.8744 6.02353 10.7713 6.02353ZM12.52 4.85788C12.4431 4.85779 12.3679 4.88051 12.3039 4.92316C12.2399 4.96582 12.19 5.02649 12.1605 5.09751C12.131 5.16853 12.1233 5.2467 12.1382 5.32213C12.1532 5.39757 12.1902 5.46687 12.2445 5.52128C12.2988 5.57569 12.3681 5.61275 12.4435 5.62779C12.5189 5.64283 12.5971 5.63516 12.6682 5.60575C12.7392 5.57634 12.8 5.52652 12.8427 5.46259C12.8854 5.39866 12.9082 5.32349 12.9082 5.24659C12.9083 5.1955 12.8984 5.1449 12.879 5.09766C12.8595 5.05042 12.8309 5.00748 12.7949 4.97129C12.7588 4.9351 12.716 4.90638 12.6688 4.88676C12.6216 4.86713 12.5711 4.857 12.52 4.85694V4.85788ZM14.6569 3.69224H10.1887C10.1365 3.69042 10.0846 3.69912 10.0358 3.71783C9.98713 3.73653 9.94268 3.76486 9.90514 3.80111C9.86761 3.83736 9.83775 3.8808 9.81736 3.92884C9.79698 3.97687 9.78647 4.02852 9.78647 4.08071C9.78647 4.13289 9.79698 4.18454 9.81736 4.23258C9.83775 4.28061 9.86761 4.32405 9.90514 4.3603C9.94268 4.39656 9.98713 4.42488 10.0358 4.44358C10.0846 4.46229 10.1365 4.47099 10.1887 4.46918H14.6569C14.7091 4.47099 14.7611 4.46229 14.8098 4.44358C14.8585 4.42488 14.903 4.39656 14.9405 4.3603C14.978 4.32405 15.0079 4.28061 15.0283 4.23258C15.0487 4.18454 15.0592 4.13289 15.0592 4.08071C15.0592 4.02852 15.0487 3.97687 15.0283 3.92884C15.0079 3.8808 14.978 3.83736 14.9405 3.80111C14.903 3.76486 14.8585 3.73653 14.8098 3.71783C14.7611 3.69912 14.7091 3.69042 14.6569 3.69224ZM14.4626 2.8562e-07C14.0191 -0.000203038 13.5824 0.108152 13.1904 0.315604C12.7985 0.523057 12.4633 0.823299 12.2141 1.19012C11.7059 1.26321 11.241 1.51699 10.9046 1.90496C10.5682 2.29293 10.3829 2.78911 10.3826 3.30259H14.6569C14.6567 2.84062 14.5068 2.39116 14.2296 2.02159C13.9525 1.65202 13.563 1.38224 13.1195 1.25271C13.4855 0.915486 13.9649 0.728338 14.4626 0.728471C15.4136 0.728471 16.4052 1.41459 16.4052 2.72V7.19059H17.1826V2.72C17.1826 1.99861 16.896 1.30677 16.3859 0.79667C15.8758 0.286571 15.184 2.8562e-07 14.4626 2.8562e-07ZM14.6569 6.41129C14.657 6.3344 14.6343 6.2592 14.5917 6.19521C14.549 6.13123 14.4883 6.08133 14.4173 6.05184C14.3463 6.02235 14.2681 6.01459 14.1927 6.02953C14.1172 6.04448 14.0479 6.08146 13.9935 6.1358C13.9391 6.19014 13.9021 6.2594 13.887 6.33482C13.872 6.41023 13.8797 6.48841 13.9091 6.55947C13.9385 6.63052 13.9883 6.69126 14.0522 6.73399C14.1162 6.77672 14.1913 6.79953 14.2682 6.79953C14.3712 6.79953 14.47 6.75864 14.5429 6.68585C14.6158 6.61305 14.6568 6.5143 14.6569 6.41129ZM14.4626 5.24565C14.4627 5.16875 14.44 5.09355 14.3973 5.02957C14.3546 4.96558 14.294 4.91569 14.223 4.8862C14.1519 4.8567 14.0738 4.84894 13.9983 4.86388C13.9229 4.87883 13.8536 4.91581 13.7992 4.97015C13.7448 5.0245 13.7077 5.09376 13.6927 5.16917C13.6776 5.24459 13.6853 5.32277 13.7147 5.39382C13.7441 5.46487 13.7939 5.52561 13.8579 5.56834C13.9218 5.61107 13.997 5.63388 14.0739 5.63388C14.1769 5.63388 14.2757 5.593 14.3486 5.5202C14.4214 5.44741 14.4625 5.34866 14.4626 5.24565Z" fill="currentColor"/>
          <path d="M0.696 11.1271C0.696059 11.7398 0.858042 12.3416 1.16554 12.8716C1.47305 13.4016 1.91514 13.8409 2.44706 14.145L1.55765 15.0344C1.45156 15.1405 1.39196 15.2844 1.39196 15.4344C1.39196 15.5844 1.45156 15.7283 1.55765 15.8344C1.66373 15.9405 1.80762 16.0001 1.95765 16.0001C2.10768 16.0001 2.25156 15.9405 2.35765 15.8344L3.63106 14.561C3.81134 14.591 3.99371 14.6067 4.17647 14.608H13.7054C13.8882 14.6067 14.0705 14.591 14.2508 14.561L15.5242 15.8344C15.6303 15.9405 15.7742 16.0001 15.9242 16.0001C16.0743 16.0001 16.2181 15.9405 16.3242 15.8344C16.4303 15.7283 16.4899 15.5844 16.4899 15.4344C16.4899 15.2844 16.4303 15.1405 16.3242 15.0344L15.4353 14.145C15.9673 13.8409 16.4095 13.4016 16.7171 12.8717C17.0247 12.3417 17.1867 11.7399 17.1868 11.1271V9.73462H0.696V11.1271ZM1.39247 7.99438H0.696C0.511409 7.99438 0.334379 8.06771 0.203854 8.19824C0.0733284 8.32876 0 8.50579 0 8.69038L0 9.03862H17.8824V8.69038C17.8824 8.50579 17.809 8.32876 17.6785 8.19824C17.548 8.06771 17.3709 7.99438 17.1864 7.99438H1.39247Z" fill="currentColor"/>
        </g>
        <defs>
          <clipPath id="clip0_bath">
            <rect width="17.8824" height="16" fill="white"/>
          </clipPath>
        </defs>
      </svg>`,y=`<svg class="property-details__icon" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_area)">
          <path d="M0.364068 2.55358L0 2.18998L2.20217 -0.0117188L4.40387 2.18998L4.04073 2.55358C3.89182 2.70198 3.69015 2.78531 3.47991 2.78531C3.26967 2.78531 3.068 2.70198 2.91909 2.55358L2.20217 1.839L1.48758 2.55358C1.33859 2.70256 1.13652 2.78625 0.925826 2.78625C0.71513 2.78625 0.513062 2.70256 0.364068 2.55358Z" fill="currentColor"/>
          <path d="M16.8556 14.3663H1.54787V0.913574H2.85646V13.0577H16.8556V14.3663Z" fill="currentColor"/>
          <path d="M15.5792 15.9143L15.2156 15.5507C15.0672 15.4018 14.9839 15.2001 14.9839 14.9899C14.9839 14.7796 15.0672 14.578 15.2156 14.429L15.9302 13.7145L15.2156 12.9994C15.0672 12.8505 14.9839 12.6488 14.9839 12.4386C14.9839 12.2283 15.0672 12.0267 15.2156 11.8778L15.5792 11.5142L17.7809 13.7163L15.5792 15.9143Z" fill="currentColor"/>
          <path d="M16.1185 10.949H15.4848C15.3113 10.949 15.1448 10.8801 15.0221 10.7574C14.8994 10.6347 14.8305 10.4683 14.8305 10.2948C14.8305 10.1212 14.8994 9.9548 15.0221 9.8321C15.1448 9.70939 15.3113 9.64046 15.4848 9.64046H16.1185C16.3106 9.64046 16.4662 9.50025 16.4662 9.32359V8.70996C16.4662 8.53643 16.5352 8.37001 16.6579 8.2473C16.7806 8.1246 16.947 8.05566 17.1205 8.05566C17.2941 8.05566 17.4605 8.1246 17.5832 8.2473C17.7059 8.37001 17.7748 8.53643 17.7748 8.70996V9.32359C17.7748 10.22 17.0317 10.949 16.1185 10.949Z" fill="currentColor"/>
          <path d="M13.0635 10.9492H9.72655C9.55302 10.9492 9.3866 10.8803 9.2639 10.7576C9.14119 10.6349 9.07226 10.4684 9.07226 10.2949C9.07226 10.1214 9.14119 9.95497 9.2639 9.83226C9.3866 9.70956 9.55302 9.64062 9.72655 9.64062H13.0635C13.237 9.64063 13.4034 9.70956 13.5261 9.83226C13.6488 9.95497 13.7177 10.1214 13.7177 10.2949C13.7177 10.4684 13.6488 10.6349 13.5261 10.7576C13.4034 10.8803 13.237 10.9492 13.0635 10.9492Z" fill="currentColor"/>
          <path d="M7.25145 10.949H6.61772C5.70451 10.949 4.96142 10.22 4.96142 9.32359V8.70996C4.96142 8.53643 5.03035 8.37001 5.15306 8.2473C5.27576 8.1246 5.44218 8.05566 5.61571 8.05566C5.78924 8.05566 5.95566 8.1246 6.07837 8.2473C6.20107 8.37001 6.27001 8.53643 6.27001 8.70996V9.32359C6.27001 9.49838 6.4261 9.64046 6.61772 9.64046H7.25145C7.42498 9.64046 7.5914 9.70939 7.7141 9.8321C7.83681 9.9548 7.90574 10.1212 7.90574 10.2948C7.90574 10.4683 7.83681 10.6347 7.7141 10.7574C7.5914 10.8801 7.42498 10.949 7.25145 10.949Z" fill="currentColor"/>
          <path d="M5.61571 7.07806C5.44218 7.07806 5.27576 7.00913 5.15306 6.88642C5.03035 6.76372 4.96142 6.5973 4.96142 6.42377V4.51977C4.96142 4.34624 5.03035 4.17982 5.15306 4.05712C5.27576 3.93441 5.44218 3.86548 5.61571 3.86548C5.78924 3.86548 5.95566 3.93441 6.07837 4.05712C6.20107 4.17982 6.27001 4.34624 6.27001 4.51977V6.42377C6.27001 6.5973 6.20107 6.76372 6.07837 6.88642C5.95566 7.00913 5.78924 7.07806 5.61571 7.07806Z" fill="currentColor"/>
          <path d="M5.61571 2.88777C5.44218 2.88777 5.27576 2.81883 5.15306 2.69613C5.03035 2.57342 4.96142 2.407 4.96142 2.23347V1.61937C4.96142 0.723455 5.70451 -0.00561523 6.61772 -0.00561523H7.25145C7.42498 -0.00561523 7.5914 0.0633191 7.7141 0.186023C7.83681 0.308727 7.90574 0.475149 7.90574 0.648679C7.90574 0.822208 7.83681 0.988631 7.7141 1.11133C7.5914 1.23404 7.42498 1.30297 7.25145 1.30297H6.61772C6.4261 1.30297 6.27001 1.44318 6.27001 1.61937V2.23347C6.27001 2.407 6.20107 2.57342 6.07837 2.69613C5.95566 2.81883 5.78924 2.88777 5.61571 2.88777Z" fill="currentColor"/>
          <path d="M13.0102 1.30297H9.67421C9.50068 1.30297 9.33426 1.23404 9.21155 1.11133C9.08885 0.988631 9.01991 0.822208 9.01991 0.648679C9.01991 0.475149 9.08885 0.308727 9.21155 0.186023C9.33426 0.0633191 9.50068 -0.00561523 9.67421 -0.00561523H13.0111C13.1846 -0.00561523 13.3511 0.0633191 13.4738 0.186023C13.5965 0.308727 13.6654 0.475149 13.6654 0.648679C13.6654 0.822208 13.5965 0.988631 13.4738 1.11133C13.3511 1.23404 13.1846 1.30297 13.0111 1.30297H13.0102Z" fill="currentColor"/>
          <path d="M17.1205 2.88777C16.947 2.88777 16.7806 2.81883 16.6579 2.69613C16.5352 2.57342 16.4662 2.407 16.4662 2.23347V1.61937C16.4662 1.44505 16.3106 1.30297 16.1185 1.30297H15.4848C15.3113 1.30297 15.1448 1.23404 15.0221 1.11133C14.8994 0.988631 14.8305 0.822208 14.8305 0.648679C14.8305 0.475149 14.8994 0.308727 15.0221 0.186023C15.1448 0.0633191 15.3113 -0.00561523 15.4848 -0.00561523H16.1185C17.0317 -0.00561523 17.7748 0.723455 17.7748 1.61937V2.23347C17.7748 2.407 17.7059 2.57342 17.5832 2.69613C17.4605 2.81883 17.2941 2.88777 17.1205 2.88777Z" fill="currentColor"/>
          <path d="M17.1205 7.07806C16.947 7.07806 16.7806 7.00913 16.6579 6.88642C16.5352 6.76372 16.4662 6.5973 16.4662 6.42377V4.51977C16.4662 4.34624 16.5352 4.17982 16.6579 4.05712C16.7806 3.93441 16.947 3.86548 17.1205 3.86548C17.2941 3.86548 17.4605 3.93441 17.5832 4.05712C17.7059 4.17982 17.7748 4.34624 17.7748 4.51977V6.42377C17.7748 6.5973 17.7059 6.76372 17.5832 6.88642C17.4605 7.00913 17.2941 7.07806 17.1205 7.07806Z" fill="currentColor"/>
        </g>
        <defs>
          <clipPath id="clip0_area">
            <rect width="17.7594" height="15.89" fill="white"/>
          </clipPath>
        </defs>
      </svg>`,$=`<svg width="118" height="98" viewBox="0 0 118 98" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.25 93.8139H14.3333M14.3333 93.8139H47.5833M14.3333 93.8139V46.4446C14.3333 43.4834 14.3333 42.0021 14.6934 40.6242C15.0125 39.4031 15.5403 38.2476 16.2491 37.2034C17.049 36.0251 18.1606 35.048 20.3891 33.098L46.9979 9.81535C51.1291 6.20053 53.1949 4.393 55.5213 3.70501C57.5728 3.09833 59.7594 3.09833 61.8109 3.70501C64.1391 4.39352 66.2078 6.20274 70.3453 9.82303L96.9453 33.098C99.1737 35.0479 100.286 36.0251 101.086 37.2034C101.795 38.2476 102.318 39.4031 102.637 40.6242C102.997 42.0021 103 43.4834 103 46.4446V93.8139M47.5833 93.8139H69.75M47.5833 93.8139V71.6472C47.5833 65.5261 52.5455 60.5639 58.6667 60.5639C64.7878 60.5639 69.75 65.5261 69.75 71.6472V93.8139M69.75 93.8139H103M103 93.8139H114.083" stroke="white" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,S=o==="side-by-side"?"property-card-compact--horizontal":"";return`
        <a href="${e.url}" class="property-card-compact ${S} mix" ${a.join(" ")}>
            <div class="property-card-compact__image-wrapper">
                ${e.imageUrl?`<img src="${e.imageUrl}" alt="${e.title}" class="property-image" loading="lazy">`:`<div class="property-image property-image--large">
                        <div class="property-image__placeholder">
                            <span class="property-image__placeholder-icon">${$}</span>
                        </div>
                    </div>`}
            </div>
            
            <div class="property-card-compact__content">
                <div class="property-card-compact__header">
                    <h3 class="property-card-compact__title">${e.title}</h3>
                    ${e.locationAddress?`<div class="property-address property-address--compact">
                        <span class="property-address__text">${e.locationAddress}</span>
                    </div>`:""}
                </div>
                
                <div class="property-price property-price--block">
                    <span class="property-price__value">${s}</span>
                </div>
                
                <div class="property-details property-details--horizontal">
                    ${n?`<span class="property-details__item">
                        ${m}
                        <span class="property-details__value">${n}</span>
                    </span>`:""}
                    ${p?`<span class="property-details__item">
                        ${f}
                        <span class="property-details__value">${p}</span>
                    </span>`:""}
                    ${i?`<span class="property-details__item">
                        ${y}
                        <span class="property-details__value">${i}</span>
                    </span>`:""}
                    ${f1(e,t)}
                </div>
            </div>
        </a>
    `}function f1(e,t){console.log("🔍 renderCustomFields called:",{hasSettings:!!t,settingsCustomFields:t?.customFields,settingsCustomFieldsCount:t?.customFields?.length||0,propertyCustomFields:e.customFields,propertyCustomFieldsType:typeof e.customFields,propertyCustomFieldsKeys:e.customFields?Object.keys(e.customFields):[]});const o=t?.customFields||[];if(!o.length||!e.customFields)return console.log("⚠️ renderCustomFields: Early return",{noSettingsFields:!o.length,noPropertyFields:!e.customFields}),"";console.log("🔍 Processing custom fields...");const r=o.filter(l=>{const a=l.visibleOnCard!==!1;return console.log(`🔍 Field ${l.name}:`,{id:l.id,visible:a}),a}).map(l=>{let a=e.customFields[l.id];if(typeof a=="boolean"?a=a?"Yes":"No":(a==="true"||a==="false")&&(a=a==="true"?"Yes":"No"),console.log(`🔍 Field ${l.name} value:`,{fieldId:l.id,value:a,isEmpty:!a||a===""||a==="No"}),!a||a===""||a==="No")return"";const s=l.iconUrl?`<span class="property-details__item">
                <img src="${l.iconUrl}" alt="${l.name}" class="property-details__icon" />
                <span class="property-details__value">${a}</span>
            </span>`:`<span class="property-details__item">
                <span class="property-details__value">${l.name}: ${a}</span>
            </span>`;return console.log(`✅ Generated HTML for ${l.name}`),s}).filter(l=>l);return console.log("🔍 renderCustomFields result:",{totalFieldsRendered:r.length,html:r.join("")}),r.join("")}let u=null,F=!1;function m1(){u||j(),window.addEventListener("favoritesChanged",()=>{F&&D(),T()}),T(),console.log("✅ Favorites drawer initialized")}function j(){u=document.createElement("div"),u.className="favorites-drawer",u.innerHTML=`
        <div class="favorites-drawer__overlay"></div>
        <div class="favorites-drawer__panel">
            <div class="favorites-drawer__header">
                <h2 class="favorites-drawer__title">Favourite Listings</h2>
                <button class="favorites-drawer__close" aria-label="Close favorites">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            <div class="favorites-drawer__content">
                <!-- Favorites will be rendered here -->
            </div>
        </div>
    `,document.body.appendChild(u),u.querySelector(".favorites-drawer__overlay").addEventListener("click",A),u.querySelector(".favorites-drawer__close").addEventListener("click",A)}function y1(){u||j(),D(),u.classList.add("favorites-drawer--open"),document.body.style.overflow="hidden",F=!0,console.log("📂 Favorites drawer opened")}function A(){u&&(u.classList.remove("favorites-drawer--open"),document.body.style.overflow="",F=!1)}function w1(){F?A():y1()}function D(){const e=b(),t=u.querySelector(".favorites-drawer__content");if(e.length===0){t.innerHTML=`
            <div class="favorites-drawer__empty">
                <svg width="64" height="64" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 4.15428C8 -0.540161 1 -0.0401611 1 5.95987C1 11.9599 10 16.9601 10 16.9601C10 16.9601 19 11.9599 19 5.95987C19 -0.0401611 12 -0.540161 10 4.15428Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h3>No Saved Properties</h3>
                <p>Properties you save will appear here</p>
            </div>
        `;return}const o=e.map(l=>v1(l)),r=window.squareheroPluginSettings||{};t.innerHTML=`
        <div class="favorites-drawer__grid">
            ${o.map(l=>`
                    <div class="favorites-card-wrapper">
                        ${h1(l,r,"stacked")}
                        <button class="favorites-card__remove" data-url="${l.url}" aria-label="Remove from favorites">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 6L6 18M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                `).join("")}
        </div>
    `,t.querySelectorAll(".favorites-card__remove").forEach(l=>{l.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation();const s=l.dataset.url;B(s)})})}function v1(e){const t=parseFloat(e.priceMin)||0,o=parseFloat(e.priceMax)||t,r=parseFloat(e.areaMin)||0,l=parseFloat(e.areaMax)||r;let a=0;if(e.bedrooms){const n=e.bedrooms.match(/\d+/);a=n?parseInt(n[0]):0}let s=0;if(e.bathrooms){const n=e.bathrooms.match(/[\d.]+/);s=n?parseFloat(n[0]):0}let i=0;if(e.garage){const n=e.garage.match(/\d+/);i=n?parseInt(n[0]):0}return{url:e.url,title:e.title,imageUrl:e.image,categories:[],tags:[],listingType:e.listingType||"for-sale",propertyType:e.propertyType||"",city:e.city||"",locationAddress:e.address||"",price:{min:t,max:o,isRange:t!==o},bedrooms:{min:a,max:a,isRange:!1},bedroomsValue:a,bathrooms:{min:s,max:s,isRange:!1},bathroomsValue:s,area:{min:r,max:l,isRange:r!==l},garage:e.garage||"",garageValue:i,customFields:e.customFields||{}}}function T(){const e=z();document.querySelectorAll(".favorites-header-btn__count").forEach(o=>{o.textContent=e,o.style.display=e>0?"flex":"none"})}function b1(){const e=document.querySelector(".header-actions .showOnMobile"),t=document.querySelector(".header-actions .showOnDesktop");if(!e&&!t){console.warn("⚠️ Neither mobile nor desktop container found - cannot add favorites button");return}const o=()=>{const r=document.createElement("button");return r.className="favorites-header-btn",r.setAttribute("aria-label","View saved properties"),r.innerHTML=`
            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4.15428C8 -0.540161 1 -0.0401611 1 5.95987C1 11.9599 10 16.9601 10 16.9601C10 16.9601 19 11.9599 19 5.95987C19 -0.0401611 12 -0.540161 10 4.15428Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="favorites-header-btn__count">0</span>
        `,r.addEventListener("click",w1),r};e&&(e.appendChild(o()),console.log("✅ Favorites header button added to mobile container")),t&&(t.appendChild(o()),console.log("✅ Favorites header button added to desktop container")),T()}function $1(){const e=document.querySelectorAll(".property-card-compact, .property-card-full");e.forEach(t=>{if(t.querySelector(".property-favorite-btn"))return;const o=_1(t);if(!o){console.warn("⚠️ Could not extract property data from card");return}const r=S1(o),l=t.querySelector(".property-card__image-wrapper, .property-card-compact__image-wrapper");l?(l.style.position="relative",l.appendChild(r)):console.warn("⚠️ Image wrapper not found in card")}),console.log(`❤️ Added heart buttons to ${e.length} property cards`)}function S1(e){const t=document.createElement("button");return t.className="property-favorite-btn",t.setAttribute("aria-label","Save to favorites"),t.dataset.propertyUrl=e.url,k(e.url)&&t.classList.add("property-favorite-btn--active"),t.innerHTML=`
        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="heart-outline" d="M10 4.15428C8 -0.540161 1 -0.0401611 1 5.95987C1 11.9599 10 16.9601 10 16.9601C10 16.9601 19 11.9599 19 5.95987C19 -0.0401611 12 -0.540161 10 4.15428Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path class="heart-fill" d="M10 4.15428C8 -0.540161 1 -0.0401611 1 5.95987C1 11.9599 10 16.9601 10 16.9601C10 16.9601 19 11.9599 19 5.95987C19 -0.0401611 12 -0.540161 10 4.15428Z" fill="currentColor"/>
        </svg>
    `,t.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),u1(e)?(t.classList.add("property-favorite-btn--active"),t.setAttribute("aria-label","Remove from favorites"),M1(t)):(t.classList.remove("property-favorite-btn--active"),t.setAttribute("aria-label","Save to favorites"))}),t}function _1(e){try{const t=e.getAttribute("href")||e.querySelector("a")?.getAttribute("href");if(!t)return null;const o=e.querySelector(".property-card__title, .property-card-compact__title")?.textContent?.trim()||"Untitled Property",l=e.querySelector(".property-price__value")?.textContent?.trim()||"",a=e.querySelector(".property-image")?.src||"",s=e.querySelector(".property-address__text")?.textContent?.trim()||"",i=e.dataset;return{url:t,title:o,price:l,image:a,address:s,listingType:i.listingType||"for-sale",propertyType:i.propertyType||"",city:i.city||"",bedrooms:i.bedrooms||"",bathrooms:i.bathrooms||"",garage:i.garage||"",areaMin:i.areaMin||"0",areaMax:i.areaMax||"0",priceMin:i.priceMin||"0",priceMax:i.priceMax||"0",customFields:Object.keys(i).filter(n=>n.startsWith("custom")).reduce((n,p)=>(n[p]=i[p],n),{})}}catch(t){return console.error("Error extracting property data:",t),null}}function M1(e){e.classList.add("property-favorite-btn--animate"),setTimeout(()=>{e.classList.remove("property-favorite-btn--animate")},600)}function L1(){document.querySelectorAll(".property-favorite-btn").forEach(t=>{const o=t.dataset.propertyUrl;k(o)?t.classList.add("property-favorite-btn--active"):t.classList.remove("property-favorite-btn--active")})}window.addEventListener("favoritesChanged",L1),document.addEventListener("DOMContentLoaded",async()=>{if(console.log("🏠 Initializing Real Estate Property Details"),new URLSearchParams(window.location.search).get("preview")==="true"){console.log("🔍 Preview mode detected - disabling navigation"),document.addEventListener("click",a=>{const s=a.target.closest("a");if(s)return a.preventDefault(),a.stopPropagation(),console.log("🚫 Link click prevented in preview mode:",s.href),!1},!0),document.body.style.cursor="default";const l=document.createElement("style");l.textContent=`
            a { 
                cursor: default !important; 
                pointer-events: none !important;
            }
        `,document.head.appendChild(l)}try{console.log("⚙️ Loading plugin settings...");const l=await P();console.log("✅ Plugin settings loaded:",l),window.squareheroPluginSettings=l}catch(l){console.warn("⚠️ Could not load plugin settings:",l)}document.body.classList.add("re-styles-loaded"),console.log("❤️ Initializing favorites..."),m1(),b1();const o=document.querySelectorAll(".property-listing-content[data-property-listing]");console.log(`Found ${o.length} property listing(s) to render`);const r=Array.from(o).map((l,a)=>(console.log(`🎨 Rendering listing ${a+1}`),l1(l).catch(s=>{console.error(`❌ Error rendering listing ${a+1}:`,s)})));await Promise.all(r),o.length===1&&p1(),setTimeout(()=>{$1()},500)})})();
