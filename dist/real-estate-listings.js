(function(){"use strict";class H{constructor(){console.log("🖼️ PropertyGalleryModal constructor called"),this.modal=null,this.currentIndex=0,this.images=[],this.init()}init(){console.log("🖼️ PropertyGalleryModal init called, readyState:",document.readyState),this.createModal(),document.readyState==="loading"?(console.log("🖼️ DOM still loading, waiting for DOMContentLoaded"),document.addEventListener("DOMContentLoaded",()=>{this.attachGalleryHandlers()})):(console.log("🖼️ DOM already loaded, attaching handlers immediately"),this.attachGalleryHandlers()),document.addEventListener("keydown",t=>{this.modal.classList.contains("active")&&(t.key==="Escape"?this.close():t.key==="ArrowLeft"?this.prev():t.key==="ArrowRight"&&this.next())})}createModal(){document.body.insertAdjacentHTML("beforeend",`
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
        `),this.modal=document.getElementById("propertyGalleryModal"),console.log("🖼️ Modal created:",this.modal?"success":"failed"),this.modal.querySelector(".property-gallery-modal-close").addEventListener("click",()=>this.close()),this.modal.querySelector(".property-gallery-modal-prev").addEventListener("click",()=>this.prev()),this.modal.querySelector(".property-gallery-modal-next").addEventListener("click",()=>this.next()),this.modal.querySelector(".property-gallery-modal-overlay").addEventListener("click",()=>this.close())}attachGalleryHandlers(){console.log("🖼️ attachGalleryHandlers called");const t=document.querySelectorAll("[data-gallery]");console.log("🖼️ Found galleries:",t.length),t.forEach(o=>{const r=o.querySelectorAll("img[data-gallery-index]");console.log("🖼️ Gallery has images:",r.length),r.forEach(a=>{a.style.cursor="pointer",a.addEventListener("click",l=>{console.log("🖼️ Image clicked, index:",l.target.dataset.galleryIndex);const s=parseInt(l.target.dataset.galleryIndex);this.open(o,s)})})})}open(t,o=0){console.log("🖼️ open() called, startIndex:",o);const r=t.querySelectorAll("img[data-gallery-index]");if(this.images=Array.from(r).map(a=>a.src),console.log("🖼️ Collected images:",this.images.length,this.images),this.images.length===0){console.log("🖼️ No images found, aborting");return}this.currentIndex=o,this.showImage(),console.log("🖼️ Adding active class to modal"),this.modal.classList.add("active"),document.body.style.overflow="hidden"}close(){this.modal.classList.remove("active"),document.body.style.overflow="",this.images=[],this.currentIndex=0}next(){this.currentIndex=(this.currentIndex+1)%this.images.length,this.showImage()}prev(){this.currentIndex=(this.currentIndex-1+this.images.length)%this.images.length,this.showImage()}showImage(){const t=this.modal.querySelector(".property-gallery-modal-image"),o=this.modal.querySelector(".property-gallery-modal-counter .current"),r=this.modal.querySelector(".property-gallery-modal-counter .total");t.src=this.images[this.currentIndex],o.textContent=this.currentIndex+1,r.textContent=this.images.length;const a=this.modal.querySelector(".property-gallery-modal-prev"),l=this.modal.querySelector(".property-gallery-modal-next");this.images.length<=1?(a.style.display="none",l.style.display="none"):(a.style.display="flex",l.style.display="flex")}}let I;document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{I=new H,document.getElementById("property-map")&&P()}):(I=new H,document.getElementById("property-map")&&P()),window.initPropertyMapNow=P,window.attachGalleryHandlers=()=>{I&&I.attachGalleryHandlers()};function P(){const e=document.getElementById("property-map");if(!e){console.log("No map container found on this page");return}const t=parseFloat(e.dataset.lat)||40.7207559,o=parseFloat(e.dataset.lng)||-74.0007613,r=parseInt(e.dataset.zoom)||15;console.log("🗺️ Initializing map with:",{lat:t,lng:o,zoom:r}),window.google&&window.google.maps?a():le().then(a).catch(l=>{console.error("Failed to load Google Maps:",l),e.innerHTML='<div style="padding:20px;text-align:center;color:#999">Map could not be loaded</div>'});function a(){const l=new google.maps.Map(e,{center:{lat:t,lng:o},zoom:r,mapTypeControl:!1,streetViewControl:!1,fullscreenControl:!0});new google.maps.Marker({position:{lat:t,lng:o},map:l,title:"Property Location"}),console.log("🗺️ Map created successfully")}}function le(){return new Promise((e,t)=>{if(window.google&&window.google.maps){e();return}const o=document.createElement("script");o.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCBTROq6LuvF_IE1r46-T4AeTSV-0d7my8",o.async=!0,o.defer=!0,o.onload=e,o.onerror=t,document.head.appendChild(o)})}const ie="https://yjqojdzcrxarffqolmtn.supabase.co",z="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqcW9qZHpjcnhhcmZmcW9sbXRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczOTk5NTIsImV4cCI6MjA1Mjk3NTk1Mn0.Sy-rSFYo_C5mJKQRCxFVeI1mW7P-FApT88LpMb7gCl8";function se(){try{const e=window.Static?.SQUARESPACE_CONTEXT?.website?.id;return e?(console.log("🆔 Supabase: Found Squarespace website ID:",e),e):(console.warn("⚠️ Supabase: No website ID found in SQUARESPACE_CONTEXT"),null)}catch(e){return console.error("❌ Supabase: Error getting website ID:",e),null}}async function ne(){try{console.log("🔍 Supabase: Attempting to fetch plugin data...");const e=se();if(!e)return console.log("⚠️ Supabase: Cannot query without website ID"),null;const t=await fetch(`${ie}/rest/v1/site_plugin_data?plugin_id=eq.real-estate&site_id=eq.${e}&select=data`,{method:"GET",headers:{apikey:z,Authorization:`Bearer ${z}`,"Content-Type":"application/json",Prefer:"return=representation"}});if(!t.ok)return console.error("❌ Supabase: Query failed:",t.status,t.statusText),null;const o=await t.json();if(!o||o.length===0)return console.log("⚠️ Supabase: No plugin data found for this site"),null;const r=o[0].data;return console.log("✅ Supabase: Plugin data retrieved:",r),r}catch(e){return console.error("❌ Supabase: Error fetching plugin data:",e),null}}function ce(e,t){if(!e||!e.collections)return t;console.log("🔄 Supabase: Merging collection IDs with default settings...");const o=e.collections,r={...t,general:{...t.general,activeCollectionId:o["squarehero-re-for-sale"]||"",soldCollectionId:o["squarehero-re-for-sale-archive"]||"",rentalsCollectionId:o["squarehero-re-for-rent"]||"",rentedCollectionId:o["squarehero-re-for-rent-archive"]||""},design:{...t.design,variablesUrl:e.cssUrl||t.design?.variablesUrl||""},_supabaseRecovery:!0,_configUrl:e.configUrl||null,_cssUrl:e.cssUrl||null};return console.log("✅ Supabase: Merged settings:",{activeCollectionId:r.general.activeCollectionId,soldCollectionId:r.general.soldCollectionId,rentalsCollectionId:r.general.rentalsCollectionId,rentedCollectionId:r.general.rentedCollectionId,recoveryMode:r._supabaseRecovery}),r}async function U(e){console.log("🔄 Supabase: Attempting to restore collection IDs...");const t=await ne();return t?ce(t,e):(console.log("⚠️ Supabase: No data available for restoration"),e)}function de(){console.log("🔍 Settings: Looking for meta tags...");const e=document.head.querySelectorAll("meta");console.log("📋 Settings: Found meta tags:",e.length);for(const o of e)if(o.getAttribute("squarehero-plugin")==="real-estate-listings-v2"){const r=o.getAttribute("license-key");if(r)try{const a=atob(r),l=JSON.parse(a);return console.log("📦 Settings: Reference data:",l),l.css&&(window._realEstateCssUrl=l.css),l.config||null}catch(a){console.error("❌ Settings: Error parsing reference:",a)}}const t=window.top.document.head.querySelectorAll("meta");for(const o of t)if(o.getAttribute("squarehero-plugin")==="real-estate-listings-v2"){const r=o.getAttribute("license-key");if(r)try{const a=atob(r),l=JSON.parse(a);return console.log("📦 Settings: Reference data (top window):",l),l.css&&(window._realEstateCssUrl=l.css),l.config||null}catch(a){console.error("❌ Settings: Error parsing reference:",a)}}return console.log("❌ Settings: No valid configuration found"),null}async function N(){try{console.log("📥 Settings: Loading settings...");const e=de();if(!e){console.log("⚠️ Settings: No config reference found, attempting Supabase fallback...");const a=await U(M());return a._supabaseRecovery?(console.log("✅ Settings: Collection IDs restored from Supabase"),a._cssUrl?await A(a._cssUrl):(console.log("⚠️ Settings: No CSS file in Supabase recovery, injecting defaults inline"),S()),a):(console.log("⚠️ Settings: Supabase fallback failed, returning defaults"),S(),M())}console.log("🔗 Settings: Config reference found:",e);const t=await fetch(e+"?"+Date.now());if(!t.ok){console.log("⚠️ Settings: Failed to load settings, attempting Supabase fallback...");const a=await U(M());return a._supabaseRecovery?(console.log("✅ Settings: Collection IDs restored from Supabase"),a._cssUrl?await A(a._cssUrl):(console.log("⚠️ Settings: No CSS file in Supabase recovery, injecting defaults inline"),S()),a):(console.log("⚠️ Settings: Supabase fallback failed, returning defaults"),S(),M())}const o=await t.json();console.log("✅ Settings: Loaded settings from JSON"),console.log("📋 Settings: Collection IDs from JSON:",{activeCollectionId:o.general?.activeCollectionId,soldCollectionId:o.general?.soldCollectionId,rentalsCollectionId:o.general?.rentalsCollectionId,rentedCollectionId:o.general?.rentedCollectionId,websiteId:o.general?.websiteId,authorId:o.general?.authorId});let r=null;return window._realEstateCssUrl?(r=window._realEstateCssUrl,console.log("📦 Settings: Using CSS URL from meta tag:",r)):o.design?.variablesUrl&&(r=o.design.variablesUrl,console.log("📦 Settings: Using CSS URL from JSON:",r)),r?await A(r):(console.log("⚠️ Settings: No CSS file found, injecting default variables inline"),S()),o}catch(e){console.error("❌ Settings: Error loading settings:",e),console.log("🔄 Settings: Attempting Supabase fallback after error...");const t=await U(M());return t._supabaseRecovery?(console.log("✅ Settings: Collection IDs restored from Supabase after error"),t._cssUrl?await A(t._cssUrl):(console.log("⚠️ Settings: No CSS file in Supabase recovery, injecting defaults inline"),S()),t):(S(),M())}}function A(e){return new Promise((t,o)=>{try{const r=window.realEstateTargetDocument||document;console.log("🎯 Settings: Injecting CSS variables into document:",{usingRealEstateTargetDocument:!!window.realEstateTargetDocument,documentURL:r.location?.href||"unknown",documentTitle:r.title||"untitled",hasAdminContainer:!!r.querySelector(".admin-container"),headElementExists:!!r.head,cssUrl:e});const a=r.querySelector("style[data-re-default-variables]");a&&(a.remove(),console.log("🗑️ Settings: Removed inline default CSS variables"));const l=r.querySelector("link[data-re-variables]");if(l){console.log("🔄 Settings: Updating existing CSS variables link"),l.href=e+"?"+Date.now(),l.onload=()=>{console.log("✅ Settings: CSS variables reloaded"),t()},l.onerror=()=>{console.error("❌ Settings: Error reloading CSS variables"),o(new Error("Failed to reload CSS variables"))};return}const s=r.createElement("link");s.rel="stylesheet",s.href=e+"?"+Date.now(),s.setAttribute("data-re-variables","true"),s.onload=()=>{console.log("✅ Settings: CSS variables loaded:",e),console.log("📍 Settings: CSS appended to document:",{docURL:r.location?.href||"unknown",linkElement:s,parentHead:r.head}),t()},s.onerror=()=>{console.error("❌ Settings: Error loading CSS variables:",e),o(new Error("Failed to load CSS variables"))},r.head.appendChild(s),console.log("📤 Settings: CSS link created and appended to <head>")}catch(r){console.error("❌ Settings: Error injecting CSS variables:",r),o(r)}})}function S(){try{const e=window.realEstateTargetDocument||document;if(e.querySelector("style[data-re-default-variables]")){console.log("✅ Settings: Default CSS variables already injected inline");return}const o=ue({}),r=e.createElement("style");r.setAttribute("data-re-default-variables","true"),r.textContent=o,e.head.appendChild(r),console.log("✅ Settings: Default CSS variables injected inline")}catch(e){console.error("❌ Settings: Error injecting default CSS inline:",e)}}function M(){return{general:{enableForSale:!0,enableRentals:!1,activeCollectionUrl:"",soldCollectionUrl:"",soldBehavior:"hide",enableSoldListings:!0,rentalsCollectionUrl:"",rentedCollectionUrl:"",rentedBehavior:"hide",enableRentedListings:!1,currency:"USD",areaUnit:"sqft",activeCollectionId:"",rentalsCollectionId:"",soldCollectionId:"",rentedCollectionId:"",websiteId:"",authorId:""},fieldVisibility:{price:!0,location:!0,area:!0,bedrooms:!0,bathrooms:!0,garage:!1},pageFieldVisibility:{price:!0,location:!0,area:!0,bedrooms:!0,bathrooms:!0,garage:!0},rentalFieldVisibility:{rentAmount:!0,deposit:!0,leaseTerm:!0,availableFrom:!0,location:!0,area:!0,bedrooms:!0,bathrooms:!0,garage:!0,furnished:!0,catsAllowed:!0,dogsAllowed:!0,utilitiesIncluded:!0},rentalPageFieldVisibility:{rentAmount:!0,deposit:!0,leaseTerm:!0,availableFrom:!0,location:!0,area:!0,bedrooms:!0,bathrooms:!0,garage:!0,furnished:!0,catsAllowed:!0,dogsAllowed:!0,utilitiesIncluded:!0},filterVisibility:{bedrooms:!0,bathrooms:!0,area:!0,price:!0,location:!1,propertyType:!1},design:{variablesUrl:null},customFields:[]}}function ue(e){const t=e.card||{},o=e.image||{},r=e.title||{},a=e.price||{},l=e.icons||{},s=e.badge||{},i=e.page||{},c=t.shadow??0,p=Math.min(c/100*.5,.5),n=Math.round(c/100*24),d=Math.round(c/100*8),m=(t.shadowColor||"rgba(0, 0, 0, 1)").replace(/rgba?\(([^)]+)\)/,(u,g)=>{const y=g.split(",").map(T=>T.trim());return y.length===4?`rgba(${y[0]}, ${y[1]}, ${y[2]}, ${p})`:`rgba(${y[0]}, ${y[1]}, ${y[2]}, ${p})`}),h=c>0?`0 ${Math.round(c/100*4)}px ${n}px ${d}px ${m}`:"none";return`/* Real Estate Plugin - Dynamic Variables */
/* Auto-generated from settings - Do not edit manually */

:root,
.admin-container {
    /* Card styles */
    --re-card-background: ${t.backgroundColor};
    --re-card-border-radius: ${t.borderRadius}${t.borderRadiusUnit};
    --re-card-padding: ${t.padding}${t.paddingUnit};
    --re-card-shadow: ${h};
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
    --re-price-color: ${a.color};
    --re-price-font-size: ${a.fontSize}${a.fontSizeUnit};
    --re-price-font-weight: ${a.fontWeight};
    
    /* Icon styles */
    --re-icon-color: ${l.color};
    --re-icon-size: ${l.size}${l.sizeUnit};
    --re-icon-spacing: ${l.spacing}${l.spacingUnit};
    --re-property-details-gap: ${l.detailsGap}${l.detailsGapUnit};
    --re-icon-text-color: ${l.textColor};
    --re-icon-text-size: ${l.textSize}${l.textSizeUnit};
    
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
    --re-page-details-card-shadow: ${i?.details?.cardMode?(()=>{const u=i?.details?.cardShadow,g=Math.min(u/100*.3,.3),T=(i?.details?.cardShadowColor).replace(/rgba?\(([^)]+)\)/,(k,B)=>{const F=B.split(",").map(Xe=>Xe.trim());return F.length===4?`rgba(${F[0]}, ${F[1]}, ${F[2]}, ${g})`:`rgba(${F[0]}, ${F[1]}, ${F[2]}, ${g})`});return`0 ${Math.round(u/100*4)}px ${Math.round(u/100*12)}px ${Math.round(u/100*4)}px ${T}`})():"none"};
    
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
`}function pe(e,t="500w"){if(!e)return"";try{if(new URL(e).pathname.endsWith("/"))return""}catch{if(e.endsWith("/"))return""}if(e.includes("/content/v1/")&&(e=e.replace("/content/v1/","/content/")),e.includes("squarespace-cdn.com")||e.includes("/content/")){const o=e.replace(/\+/g,"%20"),r=new URL(o),a=typeof t=="number"?`${t}w`:t;return r.searchParams.set("format",a),r.toString()}return e}const ge="AIzaSyCBTROq6LuvF_IE1r46-T4AeTSV-0d7my8";let v=null,C=[],x=null;async function fe(){console.log("🚀 [ListingsPage] initializeListingsPage() called");const e=document.getElementById("propertyListingsContainer");if(!e){console.error("❌ [ListingsPage] No propertyListingsContainer found");return}console.log("✅ [ListingsPage] Container found, starting initialization");try{console.log("⚙️ [ListingsPage] Loading settings...");const t=await N();console.log("✅ [ListingsPage] Settings loaded:",t);const o=t.general?.activeCollectionUrl||"/listings",r=t.general?.rentalsCollectionUrl||"";console.log("📋 Collection URLs:",{activeCollectionUrl:o,rentalsCollectionUrl:r,hasRentals:!!r});const a=window.squareheroRealEstateSettings||{},l=a.hasOwnProperty("showMap")?a.showMap:t.listings?.showMap!==!1,s=a.mapStyle||t.listings?.mapStyle||"standard",i=a.hasOwnProperty("mapFullWidth")?a.mapFullWidth:t.listings?.mapFullWidth||!1,c=a.mapHeight||t.listings?.mapHeight||"500px",p=a.mapLayout||t.listings?.mapLayout||"stacked",n=a.propertyStatus||t.listings?.propertyStatus||"both",d=a.hasOwnProperty("showFilters")?a.showFilters:t.listings?.showFilters!==!1,f=a.layoutType||t.listings?.layoutType||"columns",m=a.gridColumns||t.listings?.gridColumns||3,h=a.cardMinWidth||t.listings?.cardMinWidth||"320px";console.log("🗺️ Map display:",l?"enabled":"disabled",a.hasOwnProperty("showMap")?"(via custom block)":"(via admin settings)"),console.log("🗺️ Map style:",s),console.log("🗺️ Map layout:",p),console.log("🗺️ Map full width:",i),console.log("🗺️ Map height:",c),console.log("🏠 Property status:",n),console.log("🔍 Show filters:",d),console.log("📐 Layout:",f,f==="columns"?`(${m} columns)`:`(min ${h})`),qe(e,l);const u=t.general?.propertyIndexUrl;let g=await he(u);if(!g&&(console.log("📇 Index not available, falling back to collection URLs"),g=await ye(t),!g||g.length===0)){console.error("❌ Could not load properties from index or collections"),await j(),e.innerHTML=`
                    <div class="real-estate-error" style="
                        padding: 40px 20px;
                        text-align: center;
                        background: #fff3cd;
                        border: 1px solid #ffc107;
                        border-radius: 8px;
                        margin: 20px 0;
                    ">
                        <h3 style="color: #856404; margin-bottom: 16px;">⚠️ No Properties Available</h3>
                        <p style="color: #856404; margin-bottom: 12px;">
                            Unable to load properties. This usually means:
                        </p>
                        <ul style="color: #856404; text-align: left; max-width: 600px; margin: 0 auto 16px; list-style-position: inside;">
                            <li>No properties have been created yet (add properties in the admin)</li>
                            <li>Collection URLs are not configured correctly</li>
                            <li>The settings file is not up to date (check plugin installation)</li>
                        </ul>
                        <p style="color: #856404; font-size: 14px; margin-top: 16px;">
                            <strong>Admin:</strong> Go to the plugin admin and add properties, or install demo content.
                        </p>
                    </div>
                `;return}if(await j(),n!=="both"){const k=n==="for-sale"?"for-sale":"for-rent";g=g.filter(B=>B.listingType===k),console.log(`Filtered to ${g.length} ${n} properties`)}const y=g.filter(k=>k.listingType==="for-sale").length,T=g.filter(k=>k.listingType==="for-rent").length;console.log(`Fetched ${g.length} total properties (${n}): ${y} for-sale, ${T} for-rent`),Ce(e,g,t,{showMap:l,mapStyle:s,mapLayout:p,mapFullWidth:i,mapHeight:c,propertyStatus:n,showFilters:d,layoutType:f,gridColumns:m,cardMinWidth:h})}catch(t){console.error("❌ Error initializing listings page:",t),Re(e,t.message)}}async function j(){const e=["https://cdn.jsdelivr.net/npm/nouislider@14.6.3/distribute/nouislider.min.js","https://cdn.jsdelivr.net/npm/nouislider@14.6.3/distribute/nouislider.min.css","https://cdnjs.cloudflare.com/ajax/libs/mixitup/3.3.1/mixitup.min.js"];await Promise.all(e.map(t=>me(t)))}function me(e){return new Promise((t,o)=>{const r=e.endsWith(".css"),a=r?`link[href="${e}"]`:`script[src="${e}"]`;if(document.querySelector(a)){t();return}const l=r?document.createElement("link"):document.createElement("script");r?(l.rel="stylesheet",l.href=e):l.src=e,l.onload=()=>t(),l.onerror=()=>o(`Failed to load ${e}`),document.head.appendChild(l)})}async function he(e){if(!e)return console.log("📇 No index URL configured"),null;try{console.log("📇 Attempting to load from property index:",e);const t=await fetch(`${e}?nocache=${new Date().getTime()}`);if(!t.ok)return console.warn(`📇 Index not found (${t.status}), falling back to direct fetch`),null;const o=await t.json();return!o.properties||!Array.isArray(o.properties)?(console.warn("📇 Invalid index structure, falling back to direct fetch"),null):(console.log(`📇 ✅ Loaded ${o.properties.length} properties from index`),console.log("📇 Index metadata:",{lastUpdated:o.metadata?.lastUpdated,totalProperties:o.metadata?.totalProperties,forSale:o.metadata?.forSale,forRent:o.metadata?.forRent}),o.properties)}catch(t){return console.warn("📇 Error loading from index, falling back to direct fetch:",t),null}}async function ye(e){console.log("🔄 Loading properties from collection URLs (fallback mode)");const t=e.general?.activeCollectionUrl,o=e.general?.rentalsCollectionUrl;if(!t&&!o)return console.error("❌ No collection URLs configured"),[];const r=[];t&&(console.log("📦 Fetching For Sale properties from:",t),r.push(O(t,"for-sale"))),o&&(console.log("📦 Fetching For Rent properties from:",o),r.push(O(o,"for-rent")));try{const l=(await Promise.all(r)).flat();return console.log(`✅ Loaded ${l.length} properties from collection URLs`),l}catch(a){return console.error("❌ Error loading from collection URLs:",a),[]}}async function O(e,t="for-sale"){const o=[];let r=`${e}?format=json&nocache=${new Date().getTime()}`,a=1;for(;r;)try{const s=await(await fetch(r)).json();if(!s.items||s.items.length===0)break;o.push(...s.items),s.pagination&&s.pagination.nextPageUrl?(r=s.pagination.nextPageUrl,a++):r=null}catch(l){console.error(`Error fetching page ${a}:`,l);break}return o.map(l=>be(l,t))}function be(e,t="for-sale"){const o=ve(e.excerpt),r=[];e.location?.addressLine1&&r.push(e.location.addressLine1),e.location?.addressLine2&&r.push(e.location.addressLine2),e.location?.addressCountry&&r.push(e.location.addressCountry);const a=r.join(", "),l=o?.city||e.location?.addressLine2?.split(",")[0]?.trim()||null;return console.log("🔍 processPropertyItem:",{id:e.id,title:e.title,listingType:t,hasExcerptData:!!o,excerptCustomFields:o?.customFields,customFieldsType:typeof o?.customFields,customFieldsKeys:o?.customFields?Object.keys(o.customFields):[]}),{id:e.id,title:e.title,url:e.fullUrl,imageUrl:pe(e.assetUrl,"500w"),location:e.location,locationAddress:a,city:l,categories:e.categories||[],tags:e.tags||[],listingType:t,propertyType:o?.propertyType||null,price:o?.price?E(o.price):null,priceValue:o?.price||0,area:o?.squareFeet?E(o.squareFeet):null,areaValue:o?.squareFeet||0,bedrooms:o?.bedrooms?E(o.bedrooms):null,bedroomsValue:o?.bedrooms||0,bathrooms:o?.bathrooms?E(o.bathrooms):null,bathroomsValue:o?.bathrooms||0,garage:o?.garage?E(o.garage):null,garageValue:o?.garage||0,customFields:o?.customFields||{}}}function ve(e){try{return e?JSON.parse(e.trim()):null}catch(t){return console.error("Failed to parse excerpt JSON:",t),null}}function E(e){if(!e)return null;const t=e.toString().trim(),o=t.match(/^([\d,\.]+)\s*-\s*([\d,\.]+)$/);if(o){const a=parseFloat(o[1].replace(/,/g,"")),l=parseFloat(o[2].replace(/,/g,""));return{min:a,max:l,isRange:!0,original:t}}const r=parseFloat(t.replace(/[^\d.-]/g,""));return isNaN(r)?null:{min:r,max:r,isRange:!1,original:t}}function w(e,t){return e?e.isRange?`${t(e.min)}-${t(e.max)}`:t(e.min):""}function Ce(e,t,o,r){const{showMap:a=!0,mapStyle:l="standard",mapLayout:s="stacked",mapFullWidth:i=!1,mapHeight:c="500px",propertyStatus:p="both",showFilters:n=!0,layoutType:d="columns",gridColumns:f=3,cardMinWidth:m="320px"}=r;if(a){e.style.setProperty("--re-listings-map-full-width",i?"1":"0");const y=typeof c=="number"||/^\d+$/.test(c)?`${c}px`:c;e.style.setProperty("--re-listings-map-height",y)}d==="columns"?(e.style.setProperty("--re-listings-grid-columns",f),e.style.setProperty("--re-listings-grid-min-width","0px")):(e.style.setProperty("--re-listings-grid-columns","auto-fill"),e.style.setProperty("--re-listings-grid-min-width",m));const h=t,u=p==="both";if(a&&s==="side-by-side"?e.innerHTML=`
            ${u?`
                <div class="listings-status-tabs">
                    <button class="status-tab active" data-status="for-sale">For Sale</button>
                    <button class="status-tab" data-status="for-rent">For Rent</button>
                </div>
            `:""}
            ${n?'<div class="listings-page-filters"></div>':""}
            <div class="listings-wrapper" data-layout="side-by-side">
                <div class="listings-page-map" id="property-map"></div>
                <div class="listings-content">
                    <div class="listings-page-grid"></div>
                    <div class="listings-page-no-results" style="display: none;">
                        <h3>No properties found</h3>
                        <p>Try adjusting your filters or <a href="#" class="reset-filters-link">reset all filters</a>.</p>
                    </div>
                </div>
            </div>
        `:e.innerHTML=`
            ${u?`
                <div class="listings-status-tabs">
                    <button class="status-tab active" data-status="for-sale">For Sale</button>
                    <button class="status-tab" data-status="for-rent">For Rent</button>
                </div>
            `:""}
            ${n?'<div class="listings-page-filters"></div>':""}
            <div class="listings-wrapper" data-layout="stacked">
                ${a?'<div class="listings-page-map" id="property-map"></div>':""}
                <div class="listings-page-grid"></div>
                <div class="listings-page-no-results" style="display: none;">
                    <h3>No properties found</h3>
                    <p>Try adjusting your filters or <a href="#" class="reset-filters-link">reset all filters</a>.</p>
                </div>
            </div>
        `,n){const y=u?t.filter(T=>T.listingType==="for-sale"):h;D(e.querySelector(".listings-page-filters"),y,o)}Ee(e.querySelector(".listings-page-grid"),h,o,s),a&&Ae(h,l),Pe(e),u&&we(e,t,o);const g=u?t.filter(y=>y.listingType==="for-sale"):h;G(g)}function we(e,t,o){const r=e.querySelectorAll(".status-tab"),a=e.querySelector(".listings-page-grid"),l=e.querySelector(".listings-page-filters"),s=a.querySelectorAll(".property-card-compact");console.log("🏷️ Initial tab setup: Hiding non-for-sale properties"),s.forEach(i=>{const c=i.dataset.listingType||"";console.log(`  Card ${i.querySelector(".property-card__title, .property-card-compact__title")?.textContent}: listingType=${c}`),i.style.display=c==="for-sale"?"":"none"}),C.length>0&&(C.forEach(i=>{const c=i.listingType||"";i.setVisible(c==="for-sale")}),console.log("🗺️ Initial map: Showing only for-sale markers")),r.forEach(i=>{i.addEventListener("click",()=>{r.forEach(d=>d.classList.remove("active")),i.classList.add("active");const c=i.dataset.status;console.log(`🏷️ Tab clicked: ${c}`);const p=t.filter(d=>d.listingType===c);console.log(`  Filtered to ${p.length} ${c} properties`),l&&(D(l,p,o),G(p));let n=0;if(s.forEach(d=>{const m=(d.dataset.listingType||"")===c;d.style.display=m?"":"none",d.classList.remove("range-filtered"),m&&n++}),console.log(`  Showing ${n} properties for ${c}`),C.length>0){let d=0;C.forEach(f=>{const h=(f.listingType||"")===c;f.setVisible(h),h&&d++}),console.log(`  Showing ${d} markers on map for ${c}`)}window.mixer&&window.mixer.forceRefresh()})})}function D(e,t,o){const r=[],a=o.filterVisibility||{};if(a.location!==!1){const s=[...new Set(t.map(i=>i.city).filter(Boolean))];s.length>0&&r.push(Se(s))}if(a.propertyType!==!1){const s=[...new Set(t.map(i=>i.propertyType).filter(Boolean))];s.length>0&&r.push($e(s))}a.bedrooms!==!1&&t.some(s=>s.bedroomsValue>0)&&r.push(Le(t)),a.garage!==!1&&t.some(s=>s.garageValue>0)&&r.push(xe(t)),a.bathrooms!==!1&&t.some(s=>s.bathroomsValue>0)&&r.push(Te(t)),a.area!==!1&&t.some(s=>s.areaValue>0)&&r.push(Fe()),a.price!==!1&&t.some(s=>s.priceValue>0)&&r.push(Me()),(o.customFields||[]).forEach(s=>{if(s.showInFilter){const i=ke(s,t);i&&r.push(i)}}),r.length>0&&r.push('<button class="listings-reset-button">Reset Filters</button>'),e.innerHTML=r.join("")}function $e(e){return`
        <div class="filter-group property-type-filter-group">
            <label for="property-type-filter">Property Type</label>
            <select id="property-type-filter" class="dropdown-filter">
                <option value="all">All</option>
                ${e.map(t=>`<option value="${t}">${t}</option>`).join("")}
            </select>
        </div>
    `}function Se(e){return`
        <div class="filter-group location-filter-group">
            <label for="location-filter">Location</label>
            <select id="location-filter" class="dropdown-filter">
                <option value="all">All</option>
                ${e.sort().map(t=>`<option value="${t}">${t}</option>`).join("")}
            </select>
        </div>
    `}function xe(e){return`
        <div class="filter-group garage-filter-group">
            <label>Garage</label>
            <div id="garage-filter" class="button-group">
                ${["Any",...[...new Set(e.map(r=>r.garageValue).filter(r=>r>0))].sort((r,a)=>r-a).map(r=>r.toString())].map((r,a)=>`
                    <button class="filter-button ${a===0?"active":""}" data-filter="${r==="Any"?"all":"garage-"+r}">
                        ${r}
                    </button>
                `).join("")}
            </div>
        </div>
    `}function Le(e){return`
        <div class="filter-group bedrooms-filter-group">
            <label>Bedrooms</label>
            <div id="bedrooms-filter" class="button-group">
                ${["Any",...[...new Set(e.map(r=>r.bedroomsValue).filter(r=>r>0))].sort((r,a)=>r-a).map(r=>r.toString())].map((r,a)=>`
                    <button class="filter-button ${a===0?"active":""}" data-filter="${r==="Any"?"all":"bed-"+r}">
                        ${r}
                    </button>
                `).join("")}
            </div>
        </div>
    `}function Te(e){return`
        <div class="filter-group bathrooms-filter-group">
            <label>Bathrooms</label>
            <div id="bathrooms-filter" class="button-group">
                ${["Any",...[...new Set(e.map(r=>r.bathroomsValue).filter(r=>r>0))].sort((r,a)=>r-a).map(r=>r.toString())].map((r,a)=>`
                    <button class="filter-button ${a===0?"active":""}" data-filter="${r==="Any"?"all":"bath-"+r}">
                        ${r}
                    </button>
                `).join("")}
            </div>
        </div>
    `}function Fe(e){return`
        <div class="filter-group area-filter-group">
            <div class="slider-label-container">
                <label>Area</label>
                <span id="area-slider-range" class="range-display"></span>
            </div>
            <div id="area-slider" class="range-slider"></div>
        </div>
    `}function Me(e){return`
        <div class="filter-group price-filter-group">
            <div class="slider-label-container">
                <label>Price</label>
                <span id="price-slider-range" class="range-display"></span>
            </div>
            <div id="price-slider" class="range-slider"></div>
        </div>
    `}function ke(e,t){const o=e.id,r=e.name||e.id,a=[...new Set(t.map(l=>l.customFields?.[o]).filter(l=>l!=null&&l!==""))];if(a.length===0)return null;if(e.type==="select"||e.type==="dropdown")return`
            <div class="filter-group custom-field-filter-group" data-custom-field="${o}">
                <label for="custom-field-${o}-filter">${r}</label>
                <select id="custom-field-${o}-filter" class="dropdown-filter custom-field-filter" data-field-key="${o}">
                    <option value="all">All</option>
                    ${a.sort().map(l=>`<option value="${l}">${l}</option>`).join("")}
                </select>
            </div>
        `;if(e.type==="yes-no"||e.type==="checkbox"||e.type==="boolean")return`
            <div class="filter-group custom-field-filter-group" data-custom-field="${o}">
                <label>${r}</label>
                <div id="custom-field-${o}-filter" class="button-group custom-field-filter" data-field-key="${o}">
                    <button class="filter-button active" data-filter="all">All</button>
                    <button class="filter-button" data-filter="custom-${o}-true">Yes</button>
                    <button class="filter-button" data-filter="custom-${o}-false">No</button>
                </div>
            </div>
        `;if(e.type==="text"&&a.length<=10)return`
            <div class="filter-group custom-field-filter-group" data-custom-field="${o}">
                <label for="custom-field-${o}-filter">${r}</label>
                <select id="custom-field-${o}-filter" class="dropdown-filter custom-field-filter" data-field-key="${o}">
                    <option value="all">All</option>
                    ${a.sort().map(l=>`<option value="${l}">${l}</option>`).join("")}
                </select>
            </div>
        `;if(e.type==="number"&&a.length<=10){const s=["Any",...a.map(i=>parseFloat(i)).filter(i=>!isNaN(i)).sort((i,c)=>i-c).map(i=>i.toString())];return`
            <div class="filter-group custom-field-filter-group" data-custom-field="${o}">
                <label>${r}</label>
                <div id="custom-field-${o}-filter" class="button-group custom-field-filter" data-field-key="${o}">
                    ${s.map((i,c)=>`
                        <button class="filter-button ${c===0?"active":""}" data-filter="${i==="Any"?"all":"custom-"+o+"-"+i}">
                            ${i}
                        </button>
                    `).join("")}
                </div>
            </div>
        `}return null}function Ee(e,t,o,r="stacked"){e.innerHTML=t.map(a=>W(a,o,r)).join("")}function W(e,t,o="stacked"){const a="sq ft",l=[];if(e.categories.length>0&&l.push(`data-categories="${e.categories.join("|")}"`),e.tags.length>0&&l.push(`data-tags="${e.tags.join("|")}"`),e.listingType&&l.push(`data-listing-type="${e.listingType}"`),e.propertyType&&l.push(`data-property-type="${e.propertyType}"`),e.city&&l.push(`data-city="${e.city}"`),e.bedrooms)if(e.bedrooms.isRange){const u=[];for(let g=e.bedrooms.min;g<=e.bedrooms.max;g++)u.push(`bed-${g}`);l.push(`data-bedrooms="${u.join(" ")}"`)}else l.push(`data-bedrooms="bed-${e.bedroomsValue}"`);if(e.bathrooms)if(e.bathrooms.isRange){const u=[];for(let g=e.bathrooms.min;g<=e.bathrooms.max;g+=.5)u.push(`bath-${g}`);l.push(`data-bathrooms="${u.join(" ")}"`)}else l.push(`data-bathrooms="bath-${e.bathroomsValue}"`);if(e.garage)if(e.garage.isRange){const u=[];for(let g=e.garage.min;g<=e.garage.max;g++)u.push(`garage-${g}`);l.push(`data-garage="${u.join(" ")}"`)}else l.push(`data-garage="garage-${e.garageValue}"`);e.area&&(l.push(`data-area-min="${e.area.min}"`),l.push(`data-area-max="${e.area.max}"`)),e.price&&(l.push(`data-price-min="${e.price.min}"`),l.push(`data-price-max="${e.price.max}"`)),e.customFields&&Object.entries(e.customFields).forEach(([u,g])=>{g!=null&&g!==""&&(typeof g=="boolean"?l.push(`data-custom-${u}="custom-${u}-${g}"`):l.push(`data-custom-${u}="${g}"`))});const s=e.price?`$${w(e.price,u=>u.toLocaleString())}`:"Price TBA",i=e.area?`${w(e.area,u=>u.toLocaleString())} ${a}`:"",c=e.bedrooms?w(e.bedrooms,u=>u.toString()):"",p=e.bathrooms?w(e.bathrooms,u=>Number.isInteger(u)?u.toString():u.toFixed(1)):"",n=`<svg class="property-details__icon" width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_bed)">
          <path d="M2.05042 4.20617C2.0504 4.08346 2.02548 3.96204 1.97716 3.84924C1.92883 3.73645 1.85812 3.63463 1.7693 3.54997C1.68048 3.4653 1.57539 3.39955 1.46041 3.35668C1.34544 3.31382 1.22295 3.29474 1.10038 3.30059C0.864824 3.31599 0.644114 3.42104 0.483624 3.59415C0.323134 3.76726 0.23506 3.99528 0.237507 4.23133V16.3204H2.05101V12.6934H6.58359V9.06635H2.05042V4.20617ZM18.1508 5.8664H7.488V12.6934H19.5097V7.22594C19.5096 6.86552 19.3664 6.5199 19.1116 6.26498C18.8568 6.01007 18.5112 5.86671 18.1508 5.8664ZM21.2355 9.06635H20.4165V16.3204H22.23V10.0609C22.23 9.7971 22.1252 9.54414 21.9387 9.35764C21.7522 9.17113 21.4993 9.06635 21.2355 9.06635ZM4.88767 4.96375C4.51969 4.93967 4.1531 5.02836 3.83681 5.21797C3.52052 5.40759 3.26956 5.68912 3.11738 6.02503C2.9652 6.36094 2.91905 6.73527 2.98508 7.09808C3.05111 7.46089 3.22618 7.79496 3.48694 8.05572C3.7477 8.31648 4.08176 8.49155 4.44458 8.55758C4.80739 8.6236 5.18171 8.57745 5.51762 8.42528C5.85353 8.2731 6.13507 8.02213 6.32468 7.70584C6.5143 7.38955 6.60298 7.02297 6.57891 6.65498C6.55018 6.21588 6.36277 5.8022 6.05161 5.49104C5.74046 5.17989 5.32678 4.99248 4.88767 4.96375Z" fill="currentColor"/>
        </g>
        <defs>
          <clipPath id="clip0_bed">
            <rect width="22.23" height="19.89" fill="white"/>
          </clipPath>
        </defs>
      </svg>`,d=`<svg class="property-details__icon" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_bath)">
          <path d="M12.52 6.02353C12.4431 6.02344 12.3679 6.04615 12.3039 6.08881C12.2399 6.13146 12.19 6.19214 12.1605 6.26316C12.131 6.33418 12.1233 6.41235 12.1382 6.48778C12.1532 6.56321 12.1902 6.63252 12.2445 6.68693C12.2988 6.74133 12.3681 6.7784 12.4435 6.79344C12.5189 6.80848 12.5971 6.8008 12.6682 6.7714C12.7392 6.74199 12.8 6.69217 12.8427 6.62824C12.8854 6.56431 12.9082 6.48913 12.9082 6.41224C12.9082 6.30923 12.8673 6.21043 12.7945 6.13755C12.7217 6.06466 12.623 6.02365 12.52 6.02353ZM10.967 4.85788C10.8902 4.85788 10.815 4.88068 10.7511 4.92339C10.6872 4.9661 10.6374 5.02681 10.6079 5.09784C10.5785 5.16886 10.5708 5.24702 10.5858 5.32242C10.6008 5.39782 10.6378 5.46708 10.6922 5.52145C10.7466 5.57581 10.8158 5.61283 10.8912 5.62783C10.9666 5.64282 11.0448 5.63513 11.1158 5.60571C11.1868 5.57629 11.2475 5.52646 11.2902 5.46254C11.333 5.39862 11.3558 5.32347 11.3558 5.24659C11.3559 5.19527 11.3458 5.14443 11.3262 5.097C11.3066 5.04958 11.2778 5.00651 11.2414 4.97029C11.2051 4.93406 11.1619 4.9054 11.1144 4.88594C11.0669 4.86649 11.016 4.85663 10.9647 4.85694L10.967 4.85788ZM10.7713 6.02353C10.6944 6.02353 10.6193 6.04633 10.5553 6.08904C10.4914 6.13175 10.4416 6.19246 10.4122 6.26348C10.3827 6.33451 10.375 6.41267 10.39 6.48807C10.405 6.56347 10.4421 6.63273 10.4964 6.68709C10.5508 6.74145 10.6201 6.77847 10.6955 6.79347C10.7709 6.80847 10.849 6.80077 10.92 6.77135C10.9911 6.74193 11.0518 6.69211 11.0945 6.62819C11.1372 6.56427 11.16 6.48911 11.16 6.41224C11.16 6.30914 11.119 6.21028 11.0461 6.13738C10.9732 6.06448 10.8744 6.02353 10.7713 6.02353ZM12.52 4.85788C12.4431 4.85779 12.3679 4.88051 12.3039 4.92316C12.2399 4.96582 12.19 5.02649 12.1605 5.09751C12.131 5.16853 12.1233 5.2467 12.1382 5.32213C12.1532 5.39757 12.1902 5.46687 12.2445 5.52128C12.2988 5.57569 12.3681 5.61275 12.4435 5.62779C12.5189 5.64283 12.5971 5.63516 12.6682 5.60575C12.7392 5.57634 12.8 5.52652 12.8427 5.46259C12.8854 5.39866 12.9082 5.32349 12.9082 5.24659C12.9083 5.1955 12.8984 5.1449 12.879 5.09766C12.8595 5.05042 12.8309 5.00748 12.7949 4.97129C12.7588 4.9351 12.716 4.90638 12.6688 4.88676C12.6216 4.86713 12.5711 4.857 12.52 4.85694V4.85788ZM14.6569 3.69224H10.1887C10.1365 3.69042 10.0846 3.69912 10.0358 3.71783C9.98713 3.73653 9.94268 3.76486 9.90514 3.80111C9.86761 3.83736 9.83775 3.8808 9.81736 3.92884C9.79698 3.97687 9.78647 4.02852 9.78647 4.08071C9.78647 4.13289 9.79698 4.18454 9.81736 4.23258C9.83775 4.28061 9.86761 4.32405 9.90514 4.3603C9.94268 4.39656 9.98713 4.42488 10.0358 4.44358C10.0846 4.46229 10.1365 4.47099 10.1887 4.46918H14.6569C14.7091 4.47099 14.7611 4.46229 14.8098 4.44358C14.8585 4.42488 14.903 4.39656 14.9405 4.3603C14.978 4.32405 15.0079 4.28061 15.0283 4.23258C15.0487 4.18454 15.0592 4.13289 15.0592 4.08071C15.0592 4.02852 15.0487 3.97687 15.0283 3.92884C15.0079 3.8808 14.978 3.83736 14.9405 3.80111C14.903 3.76486 14.8585 3.73653 14.8098 3.71783C14.7611 3.69912 14.7091 3.69042 14.6569 3.69224ZM14.4626 2.8562e-07C14.0191 -0.000203038 13.5824 0.108152 13.1904 0.315604C12.7985 0.523057 12.4633 0.823299 12.2141 1.19012C11.7059 1.26321 11.241 1.51699 10.9046 1.90496C10.5682 2.29293 10.3829 2.78911 10.3826 3.30259H14.6569C14.6567 2.84062 14.5068 2.39116 14.2296 2.02159C13.9525 1.65202 13.563 1.38224 13.1195 1.25271C13.4855 0.915486 13.9649 0.728338 14.4626 0.728471C15.4136 0.728471 16.4052 1.41459 16.4052 2.72V7.19059H17.1826V2.72C17.1826 1.99861 16.896 1.30677 16.3859 0.79667C15.8758 0.286571 15.184 2.8562e-07 14.4626 2.8562e-07ZM14.6569 6.41129C14.657 6.3344 14.6343 6.2592 14.5917 6.19521C14.549 6.13123 14.4883 6.08133 14.4173 6.05184C14.3463 6.02235 14.2681 6.01459 14.1927 6.02953C14.1172 6.04448 14.0479 6.08146 13.9935 6.1358C13.9391 6.19014 13.9021 6.2594 13.887 6.33482C13.872 6.41023 13.8797 6.48841 13.9091 6.55947C13.9385 6.63052 13.9883 6.69126 14.0522 6.73399C14.1162 6.77672 14.1913 6.79953 14.2682 6.79953C14.3712 6.79953 14.47 6.75864 14.5429 6.68585C14.6158 6.61305 14.6568 6.5143 14.6569 6.41129ZM14.4626 5.24565C14.4627 5.16875 14.44 5.09355 14.3973 5.02957C14.3546 4.96558 14.294 4.91569 14.223 4.8862C14.1519 4.8567 14.0738 4.84894 13.9983 4.86388C13.9229 4.87883 13.8536 4.91581 13.7992 4.97015C13.7448 5.0245 13.7077 5.09376 13.6927 5.16917C13.6776 5.24459 13.6853 5.32277 13.7147 5.39382C13.7441 5.46487 13.7939 5.52561 13.8579 5.56834C13.9218 5.61107 13.997 5.63388 14.0739 5.63388C14.1769 5.63388 14.2757 5.593 14.3486 5.5202C14.4214 5.44741 14.4625 5.34866 14.4626 5.24565Z" fill="currentColor"/>
          <path d="M0.696 11.1271C0.696059 11.7398 0.858042 12.3416 1.16554 12.8716C1.47305 13.4016 1.91514 13.8409 2.44706 14.145L1.55765 15.0344C1.45156 15.1405 1.39196 15.2844 1.39196 15.4344C1.39196 15.5844 1.45156 15.7283 1.55765 15.8344C1.66373 15.9405 1.80762 16.0001 1.95765 16.0001C2.10768 16.0001 2.25156 15.9405 2.35765 15.8344L3.63106 14.561C3.81134 14.591 3.99371 14.6067 4.17647 14.608H13.7054C13.8882 14.6067 14.0705 14.591 14.2508 14.561L15.5242 15.8344C15.6303 15.9405 15.7742 16.0001 15.9242 16.0001C16.0743 16.0001 16.2181 15.9405 16.3242 15.8344C16.4303 15.7283 16.4899 15.5844 16.4899 15.4344C16.4899 15.2844 16.4303 15.1405 16.3242 15.0344L15.4353 14.145C15.9673 13.8409 16.4095 13.4016 16.7171 12.8717C17.0247 12.3417 17.1867 11.7399 17.1868 11.1271V9.73462H0.696V11.1271ZM1.39247 7.99438H0.696C0.511409 7.99438 0.334379 8.06771 0.203854 8.19824C0.0733284 8.32876 0 8.50579 0 8.69038L0 9.03862H17.8824V8.69038C17.8824 8.50579 17.809 8.32876 17.6785 8.19824C17.548 8.06771 17.3709 7.99438 17.1864 7.99438H1.39247Z" fill="currentColor"/>
        </g>
        <defs>
          <clipPath id="clip0_bath">
            <rect width="17.8824" height="16" fill="white"/>
          </clipPath>
        </defs>
      </svg>`,f=`<svg class="property-details__icon" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      </svg>`,m=`<svg width="118" height="98" viewBox="0 0 118 98" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.25 93.8139H14.3333M14.3333 93.8139H47.5833M14.3333 93.8139V46.4446C14.3333 43.4834 14.3333 42.0021 14.6934 40.6242C15.0125 39.4031 15.5403 38.2476 16.2491 37.2034C17.049 36.0251 18.1606 35.048 20.3891 33.098L46.9979 9.81535C51.1291 6.20053 53.1949 4.393 55.5213 3.70501C57.5728 3.09833 59.7594 3.09833 61.8109 3.70501C64.1391 4.39352 66.2078 6.20274 70.3453 9.82303L96.9453 33.098C99.1737 35.0479 100.286 36.0251 101.086 37.2034C101.795 38.2476 102.318 39.4031 102.637 40.6242C102.997 42.0021 103 43.4834 103 46.4446V93.8139M47.5833 93.8139H69.75M47.5833 93.8139V71.6472C47.5833 65.5261 52.5455 60.5639 58.6667 60.5639C64.7878 60.5639 69.75 65.5261 69.75 71.6472V93.8139M69.75 93.8139H103M103 93.8139H114.083" stroke="white" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,h=o==="side-by-side"?"property-card-compact--horizontal":"";return`
        <a href="${e.url}" class="property-card-compact ${h} mix" ${l.join(" ")}>
            <div class="property-card-compact__image-wrapper">
                ${e.imageUrl?`<img src="${e.imageUrl}" alt="${e.title}" class="property-image" loading="lazy">`:`<div class="property-image property-image--large">
                        <div class="property-image__placeholder">
                            <span class="property-image__placeholder-icon">${m}</span>
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
                    ${c?`<span class="property-details__item">
                        ${n}
                        <span class="property-details__value">${c}</span>
                    </span>`:""}
                    ${p?`<span class="property-details__item">
                        ${d}
                        <span class="property-details__value">${p}</span>
                    </span>`:""}
                    ${i?`<span class="property-details__item">
                        ${f}
                        <span class="property-details__value">${i}</span>
                    </span>`:""}
                    ${Ie(e,t)}
                </div>
            </div>
        </a>
    `}function Ie(e,t){console.log("🔍 renderCustomFields called:",{hasSettings:!!t,settingsCustomFields:t?.customFields,settingsCustomFieldsCount:t?.customFields?.length||0,propertyCustomFields:e.customFields,propertyCustomFieldsType:typeof e.customFields,propertyCustomFieldsKeys:e.customFields?Object.keys(e.customFields):[]});const o=t?.customFields||[];if(!o.length||!e.customFields)return console.log("⚠️ renderCustomFields: Early return",{noSettingsFields:!o.length,noPropertyFields:!e.customFields}),"";console.log("🔍 Processing custom fields...");const r=o.filter(a=>{const l=a.visibleOnCard!==!1;return console.log(`🔍 Field ${a.name}:`,{id:a.id,visible:l}),l}).map(a=>{let l=e.customFields[a.id];if(typeof l=="boolean"?l=l?"Yes":"No":(l==="true"||l==="false")&&(l=l==="true"?"Yes":"No"),console.log(`🔍 Field ${a.name} value:`,{fieldId:a.id,value:l,isEmpty:!l||l===""||l==="No"}),!l||l===""||l==="No")return"";const s=a.iconUrl?`<span class="property-details__item">
                <img src="${a.iconUrl}" alt="${a.name}" class="property-details__icon" />
                <span class="property-details__value">${l}</span>
            </span>`:`<span class="property-details__item">
                <span class="property-details__value">${a.name}: ${l}</span>
            </span>`;return console.log(`✅ Generated HTML for ${a.name}`),s}).filter(a=>a);return console.log("🔍 renderCustomFields result:",{totalFieldsRendered:r.length,html:r.join("")}),r.join("")}async function Ae(e,t="standard"){const o=document.getElementById("property-map");if(!o){console.log("No map element found");return}console.log("🗺️ Initializing map with style:",t),await _e();const r=e.filter(n=>n.location?.mapLat&&n.location?.mapLng);if(console.log(`Found ${r.length} properties with location data`),r.length===0){o.innerHTML='<p style="padding: 20px; text-align: center;">No properties with location data available.</p>';return}const a=r.reduce((n,d)=>n+parseFloat(d.location.mapLat),0)/r.length,l=r.reduce((n,d)=>n+parseFloat(d.location.mapLng),0)/r.length,s={standard:[{featureType:"poi",elementType:"labels",stylers:[{visibility:"off"}]}],silver:[{elementType:"geometry",stylers:[{color:"#f5f5f5"}]},{elementType:"labels.icon",stylers:[{visibility:"off"}]},{elementType:"labels.text.fill",stylers:[{color:"#616161"}]},{elementType:"labels.text.stroke",stylers:[{color:"#f5f5f5"}]},{featureType:"administrative.land_parcel",elementType:"labels.text.fill",stylers:[{color:"#bdbdbd"}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#eeeeee"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#757575"}]},{featureType:"poi.park",elementType:"geometry",stylers:[{color:"#e5e5e5"}]},{featureType:"poi.park",elementType:"labels.text.fill",stylers:[{color:"#9e9e9e"}]},{featureType:"road",elementType:"geometry",stylers:[{color:"#ffffff"}]},{featureType:"road.arterial",elementType:"labels.text.fill",stylers:[{color:"#757575"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#dadada"}]},{featureType:"road.highway",elementType:"labels.text.fill",stylers:[{color:"#616161"}]},{featureType:"road.local",elementType:"labels.text.fill",stylers:[{color:"#9e9e9e"}]},{featureType:"transit.line",elementType:"geometry",stylers:[{color:"#e5e5e5"}]},{featureType:"transit.station",elementType:"geometry",stylers:[{color:"#eeeeee"}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#c9c9c9"}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{color:"#9e9e9e"}]}],dark:[{elementType:"geometry",stylers:[{color:"#212121"}]},{elementType:"labels.icon",stylers:[{visibility:"off"}]},{elementType:"labels.text.fill",stylers:[{color:"#757575"}]},{elementType:"labels.text.stroke",stylers:[{color:"#212121"}]},{featureType:"administrative",elementType:"geometry",stylers:[{color:"#757575"}]},{featureType:"administrative.country",elementType:"labels.text.fill",stylers:[{color:"#9e9e9e"}]},{featureType:"administrative.land_parcel",stylers:[{visibility:"off"}]},{featureType:"administrative.locality",elementType:"labels.text.fill",stylers:[{color:"#bdbdbd"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#757575"}]},{featureType:"poi.park",elementType:"geometry",stylers:[{color:"#181818"}]},{featureType:"poi.park",elementType:"labels.text.fill",stylers:[{color:"#616161"}]},{featureType:"poi.park",elementType:"labels.text.stroke",stylers:[{color:"#1b1b1b"}]},{featureType:"road",elementType:"geometry.fill",stylers:[{color:"#2c2c2c"}]},{featureType:"road",elementType:"labels.text.fill",stylers:[{color:"#8a8a8a"}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#373737"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#3c3c3c"}]},{featureType:"road.highway.controlled_access",elementType:"geometry",stylers:[{color:"#4e4e4e"}]},{featureType:"road.local",elementType:"labels.text.fill",stylers:[{color:"#616161"}]},{featureType:"transit",elementType:"labels.text.fill",stylers:[{color:"#757575"}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#000000"}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{color:"#3d3d3d"}]}]};v=new google.maps.Map(o,{center:{lat:a,lng:l},zoom:12,mapTypeControl:!0,streetViewControl:!1,fullscreenControl:!0,zoomControl:!0,styles:s[t]||s.standard});const i=getComputedStyle(document.documentElement).getPropertyValue("--re-listings-map-pin-color").trim()||"#00113C",c={url:"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(`
            <svg width="34" height="46" viewBox="0 0 34 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 0.5C26.1665 0.5 33.5 7.85899 33.5 17.0654C33.5 21.6628 31.6716 25.8298 28.6289 30.2939C25.6598 34.6501 21.5851 39.223 17 44.7275C12.4149 39.223 8.34018 34.6501 5.37109 30.2939C2.32839 25.8298 0.500012 21.6628 0.5 17.0654C0.5 7.85899 7.83351 0.5 17 0.5ZM17 10.877C13.5868 10.877 10.833 13.6438 10.833 17.0654C10.833 20.4871 13.5868 23.2539 17 23.2539C20.4132 23.2539 23.167 20.4871 23.167 17.0654C23.167 13.6438 20.4132 10.877 17 10.877Z" fill="${i}" stroke="white"/>
            </svg>
        `),scaledSize:new google.maps.Size(34,46),anchor:new google.maps.Point(17,46)},p=new google.maps.InfoWindow;if(r.forEach(n=>{const d=new google.maps.Marker({position:{lat:parseFloat(n.location.mapLat),lng:parseFloat(n.location.mapLng)},map:v,title:n.title,animation:google.maps.Animation.DROP,icon:c});d.propertyUrl=n.url,d.listingType=n.listingType;const f=n.price?`$${w(n.price,u=>u.toLocaleString())}`:"Price TBA",m=[];n.bedrooms&&m.push(`${w(n.bedrooms,u=>u.toString())} beds`),n.bathrooms&&m.push(`${w(n.bathrooms,u=>Number.isInteger(u)?u.toString():u.toFixed(1))} baths`),n.area&&m.push(`${w(n.area,u=>u.toLocaleString())} sq ft`);const h=`
            <div class="map-info-card">
                <a href="${n.url}" class="map-info-card__link">
                    ${n.imageUrl?`<div class="map-info-card__image-wrapper">
                            <img src="${n.imageUrl}" alt="${n.title}" class="map-info-card__image">
                        </div>`:`<div class="map-info-card__image-wrapper map-info-card__image-placeholder">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                        </div>`}
                    <div class="map-info-card__content">
                        <h3 class="map-info-card__title">${n.title}</h3>
                        ${n.locationAddress?`<p class="map-info-card__address">${n.locationAddress}</p>`:""}
                        <div class="map-info-card__price">${f}</div>
                        ${m.length>0?`<div class="map-info-card__details">${m.join(" • ")}</div>`:""}
                    </div>
                </a>
            </div>
        `;d.addListener("click",()=>{p.setContent(h),p.open(v,d)}),C.push(d)}),r.length>1){const n=new google.maps.LatLngBounds;r.forEach(d=>{n.extend({lat:parseFloat(d.location.mapLat),lng:parseFloat(d.location.mapLng)})}),v.fitBounds(n)}console.log(`✅ Map initialized with ${C.length} markers`)}function Z(){if(!v||C.length===0)return;const e=document.querySelectorAll(".property-card-compact"),t=new Set;e.forEach(a=>{if(a.style.display!=="none"&&!a.classList.contains("range-filtered")){const l=a.getAttribute("href");l&&t.add(l)}});const o=new google.maps.LatLngBounds;let r=0;C.forEach(a=>{t.has(a.propertyUrl)?(a.setMap(v),o.extend(a.getPosition()),r++):a.setMap(null)}),r>0&&(v.fitBounds(o),r===1&&google.maps.event.addListenerOnce(v,"bounds_changed",function(){v.getZoom()>15&&v.setZoom(15)})),console.log(`🗺️ Map updated: ${r} visible markers`)}function _e(){return new Promise((e,t)=>{if(window.google&&window.google.maps){e();return}const o=document.createElement("script");o.src=`https://maps.googleapis.com/maps/api/js?key=${ge}`,o.async=!0,o.defer=!0,o.onload=()=>{console.log("✅ Google Maps API loaded"),e()},o.onerror=()=>{console.error("❌ Failed to load Google Maps API"),t(new Error("Failed to load Google Maps API"))},document.head.appendChild(o)})}function Pe(e){const t=e.querySelector(".listings-page-grid"),o=e.querySelector(".listings-page-no-results");console.log("🎯 MixItUp Init:",{grid:t,gridExists:!!t,cards:t?t.querySelectorAll(".property-card-compact").length:0}),x=mixitup(t,{selectors:{target:".property-card-compact"},load:{filter:"all"},animation:{duration:0,nudge:!1,reverseOut:!1,effects:"fade"},controls:{toggleLogic:"and"},callbacks:{onMixStart:function(r){console.log("🔵 MixItUp START:",{activeFilter:r.activeFilter.selector,totalTargets:r.totalTargets})},onMixEnd:function(r){console.log("🟢 MixItUp END:",{totalShow:r.totalShow,totalHide:r.totalHide,activeFilter:r.activeFilter.selector});const a=t.querySelectorAll(".property-card-compact");console.log("📊 DOM State:",{totalCards:a.length,visibleCards:Array.from(a).filter(l=>l.style.display!=="none").length,hiddenCards:Array.from(a).filter(l=>l.style.display==="none").length}),Array.from(a).slice(0,3).forEach((l,s)=>{console.log(`Card ${s}:`,{display:l.style.display,bedrooms:l.getAttribute("data-bedrooms"),propertyType:l.getAttribute("data-property-type")})}),r.totalShow===0?(o.style.display="block",t.style.display="none"):(o.style.display="none",t.style.display="")}}}),console.log("✅ MixItUp initialized:",x)}function G(e,t){const o=document.getElementById("category-filter"),r=document.getElementById("tag-filter"),a=document.getElementById("property-type-filter"),l=document.getElementById("location-filter");if(o&&o.addEventListener("change",$),r&&r.addEventListener("change",$),a&&a.addEventListener("change",$),l&&l.addEventListener("change",$),document.querySelectorAll(".custom-field-filter.dropdown-filter").forEach(n=>{n.addEventListener("change",$)}),document.querySelectorAll(".button-group").forEach(n=>{n.addEventListener("click",d=>{d.target.classList.contains("filter-button")&&(n.querySelectorAll(".filter-button").forEach(f=>f.classList.remove("active")),d.target.classList.add("active"),$())})}),document.getElementById("area-slider")){const n=e.map(m=>m.areaValue).filter(m=>m>0),d=Math.min(...n),f=Math.max(...n);J("area-slider",d,f,"sq ft",$)}if(document.getElementById("price-slider")){const n=e.map(m=>m.priceValue).filter(m=>m>0),d=Math.min(...n),f=Math.max(...n);J("price-slider",d,f,"$",$)}const c=document.querySelector(".listings-reset-button");c&&c.addEventListener("click",Y);const p=document.querySelector(".reset-filters-link");p&&p.addEventListener("click",n=>{n.preventDefault(),Y()})}function J(e,t,o,r,a){const l=document.getElementById(e),s=document.getElementById(`${e}-range`);!l||!s||(t===o&&(o=t+1),noUiSlider.create(l,{start:[t,o],connect:!0,range:{min:t,max:o},format:{to:i=>Math.round(i),from:i=>Number(i)}}),l.noUiSlider.on("update",i=>{const c=r==="sq ft"||r==="m²"?`${parseInt(i[0]).toLocaleString()} ${r}`:`${r}${parseInt(i[0]).toLocaleString()}`,p=r==="sq ft"||r==="m²"?`${parseInt(i[1]).toLocaleString()} ${r}`:`${r}${parseInt(i[1]).toLocaleString()}`;s.textContent=`${c} - ${p}`,a&&a(i)}))}function $(){let e=[];const t=document.getElementById("category-filter");t&&t.value!=="all"&&(document.querySelectorAll(".property-card-compact").forEach(n=>{n.classList.remove("category-match");const d=n.getAttribute("data-categories");d&&d.split("|").map(f=>f.trim()).includes(t.value)&&n.classList.add("category-match")}),e.push(".category-match"));const o=document.getElementById("tag-filter");o&&o.value!=="all"&&(document.querySelectorAll(".property-card-compact").forEach(n=>{n.classList.remove("tag-match");const d=n.getAttribute("data-tags");d&&d.split("|").map(f=>f.trim()).includes(o.value)&&n.classList.add("tag-match")}),e.push(".tag-match"));const r=document.getElementById("property-type-filter");r&&r.value!=="all"&&e.push(`[data-property-type="${r.value}"]`);const a=document.getElementById("location-filter");a&&a.value!=="all"&&e.push(`[data-city="${a.value}"]`);const l=document.querySelector("#bedrooms-filter .filter-button.active");if(l){const n=l.getAttribute("data-filter");n!=="all"&&e.push(`[data-bedrooms~="${n}"]`)}const s=document.querySelector("#garage-filter .filter-button.active");if(s){const n=s.getAttribute("data-filter");n!=="all"&&e.push(`[data-garage~="${n}"]`)}const i=document.querySelector("#bathrooms-filter .filter-button.active");if(i){const n=i.getAttribute("data-filter");n!=="all"&&e.push(`[data-bathrooms~="${n}"]`)}document.querySelectorAll(".custom-field-filter.dropdown-filter").forEach(n=>{if(n.value!=="all"){const d=n.getAttribute("data-field-key");e.push(`[data-custom-${d}="${n.value}"]`)}}),document.querySelectorAll(".custom-field-filter.button-group").forEach(n=>{const d=n.querySelector(".filter-button.active");if(d){const f=d.getAttribute("data-filter");if(f!=="all"){const m=n.getAttribute("data-field-key");e.push(`[data-custom-${m}~="${f}"]`)}}});const c=e.length>0?e.join(""):"all";console.log("🔍 Filter Update:",{filterGroups:e,filterString:c,mixerExists:!!x});const p=document.querySelectorAll(".property-card-compact");if(console.log("🎴 Cards before filter:",{totalCards:p.length,sampleCard:p[0]?{bedrooms:p[0].getAttribute("data-bedrooms"),bathrooms:p[0].getAttribute("data-bathrooms"),propertyType:p[0].getAttribute("data-property-type"),city:p[0].getAttribute("data-city"),classes:p[0].className}:"No cards found"}),c!=="all")try{const n=document.querySelectorAll(".listings-page-grid "+c);console.log("🧪 Manual selector test:",{selector:".listings-page-grid "+c,matches:n.length})}catch(n){console.error("❌ Selector error:",n.message)}x&&x.filter(c).then(n=>{console.log("✅ MixItUp filtered:",{totalShow:n.totalShow,totalHide:n.totalHide}),(!t||t.value==="all")&&document.querySelectorAll(".property-card-compact").forEach(f=>{f.classList.remove("category-match")}),(!o||o.value==="all")&&document.querySelectorAll(".property-card-compact").forEach(f=>{f.classList.remove("tag-match")}),Ue();const d=Array.from(document.querySelectorAll(".property-card-compact")).filter(f=>f.style.display!=="none"&&!f.classList.contains("range-filtered")).length;console.log("📊 After range filters:",{visibleCards:d}),Z()})}function Ue(){const e=document.getElementById("area-slider"),t=document.getElementById("price-slider");let o=null,r=null;if(e&&e.noUiSlider){const a=e.noUiSlider.get();o={min:parseFloat(a[0]),max:parseFloat(a[1])}}if(t&&t.noUiSlider){const a=t.noUiSlider.get();r={min:parseFloat(a[0]),max:parseFloat(a[1])}}document.querySelectorAll(".property-card-compact").forEach(a=>{let l=!0,s=!0;if(o){const c=parseFloat(a.getAttribute("data-area-min")),p=parseFloat(a.getAttribute("data-area-max"));c&&p&&(l=!(p<o.min||c>o.max))}if(r){const c=parseFloat(a.getAttribute("data-price-min")),p=parseFloat(a.getAttribute("data-price-max"));c&&p&&(s=!(p<r.min||c>r.max))}l&&s?a.classList.remove("range-filtered"):a.classList.add("range-filtered")}),Z()}function Y(){const e=document.getElementById("category-filter"),t=document.getElementById("tag-filter"),o=document.getElementById("property-type-filter"),r=document.getElementById("location-filter");e&&(e.value="all"),t&&(t.value="all"),o&&(o.value="all"),r&&(r.value="all"),document.querySelectorAll(".custom-field-filter.dropdown-filter").forEach(s=>{s.value="all"}),document.querySelectorAll(".button-group .filter-button").forEach(s=>{s.classList.remove("active"),s.getAttribute("data-filter")==="all"&&s.classList.add("active")});const a=document.getElementById("area-slider"),l=document.getElementById("price-slider");a&&a.noUiSlider&&a.noUiSlider.reset(),l&&l.noUiSlider&&l.noUiSlider.reset(),x&&x.filter("all"),document.querySelectorAll(".property-card-compact").forEach(s=>{s.style.display="",s.classList.remove("range-filtered")})}function qe(e,t){const o=t?'<div class="listings-page-map-skeleton"></div>':"";e.innerHTML=`
        ${o}
        <div class="listings-page-filters-skeleton">
            <div class="skeleton-filter"></div>
            <div class="skeleton-filter"></div>
            <div class="skeleton-filter"></div>
            <div class="skeleton-button"></div>
        </div>
        <div class="listings-page-grid-skeleton">
            ${Array(6).fill(0).map(()=>`
                <div class="property-card-skeleton">
                    <div class="skeleton-image"></div>
                    <div class="skeleton-content">
                        <div class="skeleton-title"></div>
                        <div class="skeleton-text"></div>
                        <div class="skeleton-price"></div>
                        <div class="skeleton-details">
                            <div class="skeleton-detail"></div>
                            <div class="skeleton-detail"></div>
                            <div class="skeleton-detail"></div>
                        </div>
                    </div>
                </div>
            `).join("")}
        </div>
    `}function Re(e,t){e.innerHTML=`
        <div class="listings-error">
            <h3>Error Loading Properties</h3>
            <p>${t}</p>
        </div>
    `}const K="realEstateFavorites",X="realEstateFavoritesAnalytics";function L(){try{const e=localStorage.getItem(K);return e?JSON.parse(e):[]}catch(e){return console.error("Error reading favorites:",e),[]}}function Q(e){try{localStorage.setItem(K,JSON.stringify(e)),He()}catch(t){console.error("Error saving favorites:",t)}}function q(e){return L().some(o=>o.url===e)}function Ve(e){const t=L();if(t.some(r=>r.url===e.url))return!1;const o={...e,addedAt:Date.now()};return t.push(o),Q(t),oe("add",e),console.log("✅ Added to favorites:",e.title),!0}function ee(e){let t=L();const o=t.length;if(t=t.filter(r=>r.url!==e),t.length<o){Q(t);const r=L().find(a=>a.url===e);return r&&oe("remove",r),console.log("❌ Removed from favorites:",e),!0}return!1}function Be(e){return q(e.url)?(ee(e.url),!1):(Ve(e),!0)}function te(){return L().length}function He(){const e=new CustomEvent("favoritesChanged",{detail:{count:te(),favorites:L()}});window.dispatchEvent(e)}function oe(e,t){try{const o=JSON.parse(localStorage.getItem(X)||"{}");o.actions||(o.actions=[]),o.propertyStats||(o.propertyStats={}),o.actions.push({action:e,propertyUrl:t.url,propertyTitle:t.title,listingType:t.listingType,price:t.priceValue,timestamp:Date.now()}),o.propertyStats[t.url]||(o.propertyStats[t.url]={title:t.title,addCount:0,removeCount:0,lastAction:null});const r=o.propertyStats[t.url];e==="add"?r.addCount++:r.removeCount++,r.lastAction=Date.now(),o.actions.length>1e3&&(o.actions=o.actions.slice(-1e3)),localStorage.setItem(X,JSON.stringify(o))}catch(o){console.error("Error tracking favorite action:",o)}}let b=null,_=!1;function ze(){b||re(),window.addEventListener("favoritesChanged",()=>{_&&ae(),V()}),V(),console.log("✅ Favorites drawer initialized")}function re(){b=document.createElement("div"),b.className="favorites-drawer",b.innerHTML=`
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
    `,document.body.appendChild(b),b.querySelector(".favorites-drawer__overlay").addEventListener("click",R),b.querySelector(".favorites-drawer__close").addEventListener("click",R)}function Ne(){b||re(),ae(),b.classList.add("favorites-drawer--open"),document.body.style.overflow="hidden",_=!0,console.log("📂 Favorites drawer opened")}function R(){b&&(b.classList.remove("favorites-drawer--open"),document.body.style.overflow="",_=!1)}function je(){_?R():Ne()}function ae(){const e=L(),t=b.querySelector(".favorites-drawer__content");if(e.length===0){t.innerHTML=`
            <div class="favorites-drawer__empty">
                <svg width="64" height="64" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 4.15428C8 -0.540161 1 -0.0401611 1 5.95987C1 11.9599 10 16.9601 10 16.9601C10 16.9601 19 11.9599 19 5.95987C19 -0.0401611 12 -0.540161 10 4.15428Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h3>No Saved Properties</h3>
                <p>Properties you save will appear here</p>
            </div>
        `;return}const o=e.map(a=>Oe(a)),r=window.squareheroPluginSettings||{};t.innerHTML=`
        <div class="favorites-drawer__grid">
            ${o.map(a=>`
                    <div class="favorites-card-wrapper">
                        ${W(a,r,"stacked")}
                        <button class="favorites-card__remove" data-url="${a.url}" aria-label="Remove from favorites">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 6L6 18M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                `).join("")}
        </div>
    `,t.querySelectorAll(".favorites-card__remove").forEach(a=>{a.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation();const s=a.dataset.url;ee(s)})})}function Oe(e){const t=parseFloat(e.priceMin)||0,o=parseFloat(e.priceMax)||t,r=parseFloat(e.areaMin)||0,a=parseFloat(e.areaMax)||r;let l=0;if(e.bedrooms){const c=e.bedrooms.match(/\d+/);l=c?parseInt(c[0]):0}let s=0;if(e.bathrooms){const c=e.bathrooms.match(/[\d.]+/);s=c?parseFloat(c[0]):0}let i=0;if(e.garage){const c=e.garage.match(/\d+/);i=c?parseInt(c[0]):0}return{url:e.url,title:e.title,imageUrl:e.image,categories:[],tags:[],listingType:e.listingType||"for-sale",propertyType:e.propertyType||"",city:e.city||"",locationAddress:e.address||"",price:{min:t,max:o,isRange:t!==o},bedrooms:{min:l,max:l,isRange:!1},bedroomsValue:l,bathrooms:{min:s,max:s,isRange:!1},bathroomsValue:s,area:{min:r,max:a,isRange:r!==a},garage:e.garage||"",garageValue:i,customFields:e.customFields||{}}}function V(){const e=te();document.querySelectorAll(".favorites-header-btn__count").forEach(o=>{o.textContent=e,o.style.display=e>0?"flex":"none"})}function De(){const e=document.querySelector(".header-actions .showOnMobile"),t=document.querySelector(".header-actions .showOnDesktop");if(!e&&!t){console.warn("⚠️ Neither mobile nor desktop container found - cannot add favorites button");return}const o=()=>{const r=document.createElement("button");return r.className="favorites-header-btn",r.setAttribute("aria-label","View saved properties"),r.innerHTML=`
            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4.15428C8 -0.540161 1 -0.0401611 1 5.95987C1 11.9599 10 16.9601 10 16.9601C10 16.9601 19 11.9599 19 5.95987C19 -0.0401611 12 -0.540161 10 4.15428Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="favorites-header-btn__count">0</span>
        `,r.addEventListener("click",je),r};e&&(e.appendChild(o()),console.log("✅ Favorites header button added to mobile container")),t&&(t.appendChild(o()),console.log("✅ Favorites header button added to desktop container")),V()}function We(){const e=document.querySelectorAll(".property-card-compact, .property-card-full");e.forEach(t=>{if(t.querySelector(".property-favorite-btn"))return;const o=Ge(t);if(!o){console.warn("⚠️ Could not extract property data from card");return}const r=Ze(o),a=t.querySelector(".property-card__image-wrapper, .property-card-compact__image-wrapper");a?(a.style.position="relative",a.appendChild(r)):console.warn("⚠️ Image wrapper not found in card")}),console.log(`❤️ Added heart buttons to ${e.length} property cards`)}function Ze(e){const t=document.createElement("button");return t.className="property-favorite-btn",t.setAttribute("aria-label","Save to favorites"),t.dataset.propertyUrl=e.url,q(e.url)&&t.classList.add("property-favorite-btn--active"),t.innerHTML=`
        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="heart-outline" d="M10 4.15428C8 -0.540161 1 -0.0401611 1 5.95987C1 11.9599 10 16.9601 10 16.9601C10 16.9601 19 11.9599 19 5.95987C19 -0.0401611 12 -0.540161 10 4.15428Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path class="heart-fill" d="M10 4.15428C8 -0.540161 1 -0.0401611 1 5.95987C1 11.9599 10 16.9601 10 16.9601C10 16.9601 19 11.9599 19 5.95987C19 -0.0401611 12 -0.540161 10 4.15428Z" fill="currentColor"/>
        </svg>
    `,t.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),Be(e)?(t.classList.add("property-favorite-btn--active"),t.setAttribute("aria-label","Remove from favorites"),Je(t)):(t.classList.remove("property-favorite-btn--active"),t.setAttribute("aria-label","Save to favorites"))}),t}function Ge(e){try{const t=e.getAttribute("href")||e.querySelector("a")?.getAttribute("href");if(!t)return null;const o=e.querySelector(".property-card__title, .property-card-compact__title")?.textContent?.trim()||"Untitled Property",a=e.querySelector(".property-price__value")?.textContent?.trim()||"",l=e.querySelector(".property-image")?.src||"",s=e.querySelector(".property-address__text")?.textContent?.trim()||"",i=e.dataset;return{url:t,title:o,price:a,image:l,address:s,listingType:i.listingType||"for-sale",propertyType:i.propertyType||"",city:i.city||"",bedrooms:i.bedrooms||"",bathrooms:i.bathrooms||"",garage:i.garage||"",areaMin:i.areaMin||"0",areaMax:i.areaMax||"0",priceMin:i.priceMin||"0",priceMax:i.priceMax||"0",customFields:Object.keys(i).filter(c=>c.startsWith("custom")).reduce((c,p)=>(c[p]=i[p],c),{})}}catch(t){return console.error("Error extracting property data:",t),null}}function Je(e){e.classList.add("property-favorite-btn--animate"),setTimeout(()=>{e.classList.remove("property-favorite-btn--animate")},600)}function Ye(){document.querySelectorAll(".property-favorite-btn").forEach(t=>{const o=t.dataset.propertyUrl;q(o)?t.classList.add("property-favorite-btn--active"):t.classList.remove("property-favorite-btn--active")})}window.addEventListener("favoritesChanged",Ye);function Ke(){const e=document.getElementById("propertyListingsContainer"),t={showMap:!0,mapStyle:"standard",mapFullWidth:!1,mapHeight:"500px",propertyStatus:"both",showFilters:!0,showSearch:!0,layoutType:"columns",gridColumns:3,cardMinWidth:"320px",maxProperties:null};if(!e)return t;try{const o=e.getAttribute("data-squarehero-settings");if(o){const r=JSON.parse(o);return console.log("📋 Custom block settings loaded:",r),{...t,...r}}}catch(o){console.warn("⚠️ Failed to parse data-squarehero-settings:",o)}return t}window.squareheroRealEstateSettings=null,document.addEventListener("DOMContentLoaded",async()=>{console.log("🏠 Initializing Real Estate Listings Page");try{console.log("⚙️ Loading plugin settings...");const t=await N();console.log("✅ Plugin settings loaded:",t),window.squareheroPluginSettings=t}catch(t){console.warn("⚠️ Could not load plugin settings:",t)}if(document.body.classList.add("re-styles-loaded"),console.log("❤️ Initializing favorites..."),ze(),De(),document.getElementById("propertyListingsContainer")){console.log("📋 Found listings page container"),window.squareheroRealEstateSettings=Ke(),console.log("⚙️ Block settings:",window.squareheroRealEstateSettings);try{await fe(),setTimeout(()=>{We()},500)}catch(t){console.error("❌ Error initializing listings page:",t)}}else console.warn("⚠️ No property listings container found on this page")})})();
