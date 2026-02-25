<template>
  <motion.div 
    :initial="{ opacity: 0, y: 20 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ 
      type: 'spring',
      stiffness: 300,
      damping: 24,
      delay: cardIndex * 0.05
    }"
    :class="['property-card-compact', `property-card-compact--${layout}`, { 'property-card-compact--preview': variant === 'preview', 'property-card-compact--draft': isDraft }]"
  >
    <div class="property-card-compact__image-wrapper">
      <slot name="image" :property="property">
        <PropertyImage 
          :src="property.imageUrl" 
          :alt="property.title"
          size="large"
        />
      </slot>
      <div v-if="isDraft" class="property-card-compact__draft-badge">Draft</div>
      <div v-if="property.status === 'Sold'" class="property-card-compact__status-badge property-card-compact__status-badge--sold">Sold</div>
      <div v-if="property.status === 'Rented'" class="property-card-compact__status-badge property-card-compact__status-badge--rented">Rented</div>
    </div>
    
    <div class="property-card-compact__content">
      <div class="property-card-compact__header">
        <slot name="title" :property="property">
          <h3 class="property-card-compact__title">{{ property.title }}</h3>
        </slot>
        
        <PropertyAddress 
        v-if="hasAddress && fieldVisibility.location && variant !== 'preview'"
        :address="property.address"
        compact
      />
    </div>
    
    <slot name="price" :property="property">
      <PropertyPrice 
        v-if="isRental ? (fieldVisibility.rentAmount !== false) : (fieldVisibility.price !== false)"
        :price="isRental ? property.rentAmount : property.price"
        :is-rental="isRental"
        :rent-period="property.rentPeriod"
        layout="block"
      />
    </slot>
    
    <slot name="details">
      <PropertyDetails 
        :beds="(fieldVisibility.bedrooms !== false) ? property.beds : null"
        :baths="(fieldVisibility.bathrooms !== false) ? property.baths : null"
        :sqft="(fieldVisibility.area !== false) ? property.sqft : null"
        :garage="(fieldVisibility.garage !== false) ? property.garage : null"
        :beds-range="property.bedroomsRange"
        :baths-range="property.bathroomsRange"
        :sqft-range="property.sqFtRange"
        :garage-range="property.garageRange"
        :allow-range-values="property.allowRangeValues"
        :custom-fields="customFieldsWithIcons"
        layout="horizontal"
      />
    </slot>
    
    <!-- Rental-specific fields -->
    <div v-if="isRental && hasRentalDetails" class="property-card-compact__rental-details">
      <div v-if="fieldVisibility.deposit && property.deposit" class="property-card-compact__rental-field">
        <span class="property-card-compact__rental-label">Deposit:</span>
        <span class="property-card-compact__rental-value">${{ property.deposit.toLocaleString() }}</span>
      </div>
      <div v-if="fieldVisibility.leaseTerm && property.leaseTerm" class="property-card-compact__rental-field">
        <span class="property-card-compact__rental-label">Lease:</span>
        <span class="property-card-compact__rental-value">{{ property.leaseTerm }}</span>
      </div>
      <div v-if="fieldVisibility.availableFrom && property.availableFrom" class="property-card-compact__rental-field">
        <span class="property-card-compact__rental-label">Available:</span>
        <span class="property-card-compact__rental-value">{{ formatDate(property.availableFrom) }}</span>
      </div>
      <div v-if="(fieldVisibility.furnished !== false) && (property.furnished === true || property.furnished === 'true')" class="property-card-compact__rental-badge">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 8L9 12L7 10M10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 14.9706 14.9706 19 10 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        Furnished
      </div>
      <div v-if="(fieldVisibility.catsAllowed !== false) && (property.catsAllowed === true || property.catsAllowed === 'true')" class="property-card-compact__rental-badge">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 8L9 12L7 10M10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 14.9706 14.9706 19 10 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        Cats Allowed
      </div>
      <div v-if="(fieldVisibility.dogsAllowed !== false) && (property.dogsAllowed === true || property.dogsAllowed === 'true')" class="property-card-compact__rental-badge">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 8L9 12L7 10M10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 14.9706 14.9706 19 10 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        Dogs Allowed
      </div>
      <div v-if="(fieldVisibility.utilitiesIncluded !== false) && (property.utilitiesIncluded === true || property.utilitiesIncluded === 'true')" class="property-card-compact__rental-badge">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 8L9 12L7 10M10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 14.9706 14.9706 19 10 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        Utilities Included
      </div>
    </div>
    
    <!-- Custom Fields without Icons -->
    <div v-if="customFieldsWithoutIcons.length > 0" class="property-card-compact__custom-fields">
      <div 
        v-for="field in customFieldsWithoutIcons" 
        :key="field.id"
        class="property-card-compact__custom-field"
      >
        <span class="property-card-compact__custom-label">{{ field.name }}:</span>
        <span class="property-card-compact__custom-value">{{ field.value }}</span>
      </div>
    </div>
      <div v-if="variant !== 'preview'" class="property-card-compact__actions">
        <button class="property-card-compact__view-btn" @click="$emit('preview-property', property.id)">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 9C1 9 3.5 4 9 4C14.5 4 17 9 17 9C17 9 14.5 14 9 14C3.5 14 1 9 1 9Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="9" cy="9" r="2.5" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          Preview
        </button>
        <button class="property-card-compact__edit-btn" @click="$emit('edit-property', property.id)">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 4.58605L1 12.5861V16.5861L5 16.586L13 8.58604M9 4.58605L11.8686 1.7174L11.8704 1.7157C12.2652 1.32082 12.463 1.12303 12.691 1.04894C12.8919 0.983686 13.1082 0.983686 13.3091 1.04894C13.5369 1.12297 13.7345 1.32054 14.1288 1.71486L15.8686 3.45466C16.2646 3.85067 16.4627 4.04878 16.5369 4.2771C16.6022 4.47795 16.6021 4.69429 16.5369 4.89513C16.4628 5.1233 16.265 5.3211 15.8695 5.71655L15.8686 5.7174L13 8.58604M9 4.58605L13 8.58604" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Edit
        </button>
      </div>
    </div>
  </motion.div>
</template>

<script setup>
import { computed } from 'vue'
import { motion } from 'motion-v'
import PropertyImage from './PropertyImage.vue'
import PropertyPrice from './PropertyPrice.vue'
import PropertyDetails from './PropertyDetails.vue'
import PropertyAddress from './PropertyAddress.vue'

const props = defineProps({
  cardIndex: {
    type: Number,
    default: 0
  },
  property: {
    type: Object,
    required: true
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'preview'].includes(value)
  },
  layout: {
    type: String,
    default: 'vertical',
    validator: (value) => ['vertical', 'horizontal'].includes(value)
  },
  fieldVisibility: {
    type: Object,
    default: () => ({
      price: true,
      location: true,
      area: true,
      bedrooms: true,
      bathrooms: true,
      garage: true
    })
  },
  customFields: {
    type: Array,
    default: () => []
  }
})

defineEmits(['edit-property', 'edit-page', 'view-listing', 'delete-property', 'preview-property'])

const hasAddress = computed(() => {
  const address = props.property.address
  if (!address) return false
  // Check if any address field has a value
  return !!(address.street || address.city || address.state || address.country)
})

const isDraft = computed(() => {
  // workflowState: 1 = PUBLISHED, 4 = DRAFT
  return props.property.workflowState === 4
})

const isRental = computed(() => {
  // Check if property has _collectionSource tag or rentAmount field
  return props.property._collectionSource === 'rent' || !!props.property.rentAmount
})

const visibleCustomFields = computed(() => {
  if (!props.property.customFields || !props.customFields.length) {
    return []
  }
  
  const mapped = props.customFields
    .filter(field => field.visibleOnCard !== false)
    .map(field => {
      let value = props.property.customFields[field.id]
      // Format boolean values as Yes/No
      if (typeof value === 'boolean') {
        value = value ? 'Yes' : 'No'
      } else if (value === 'true' || value === 'false') {
        value = value === 'true' ? 'Yes' : 'No'
      }
      return {
        id: field.id,
        name: field.name,
        icon: field.iconUrl || field.icon,
        value: value
      }
    })
    .filter(field => field.value !== null && field.value !== undefined && field.value !== '')
  
  return mapped
})

const customFieldsWithIcons = computed(() => {
  return visibleCustomFields.value.filter(field => field.icon && field.icon.trim() !== '')
})

const customFieldsWithoutIcons = computed(() => {
  return visibleCustomFields.value.filter(field => !field.icon || field.icon.trim() === '')
})

const hasRentalDetails = computed(() => {
  return (
    (props.fieldVisibility.deposit !== false && props.property.deposit) ||
    (props.fieldVisibility.leaseTerm !== false && props.property.leaseTerm) ||
    (props.fieldVisibility.availableFrom !== false && props.property.availableFrom) ||
    (props.fieldVisibility.furnished !== false && (props.property.furnished === true || props.property.furnished === 'true')) ||
    (props.fieldVisibility.catsAllowed !== false && (props.property.catsAllowed === true || props.property.catsAllowed === 'true')) ||
    (props.fieldVisibility.dogsAllowed !== false && (props.property.dogsAllowed === true || props.property.dogsAllowed === 'true')) ||
    (props.fieldVisibility.utilitiesIncluded !== false && (props.property.utilitiesIncluded === true || props.property.utilitiesIncluded === 'true'))
  )
})

function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<style lang="scss" scoped>
.property-card-compact {
  display: flex;
  flex-direction: column;
  background: var(--re-card-background, white);
  border-radius: var(--re-card-border-radius);
  overflow: hidden;
  box-shadow: var(--re-card-shadow);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &--horizontal {
    flex-direction: row;
    
    .property-card-compact__image-wrapper {
      width: 40%;
      height: auto;
      min-height: 100%;
      padding: 0;
      
      :deep(.property-image) {
        width: 100%;
        height: 100%;
        aspect-ratio: unset;
        object-fit: cover;
      }
    }
    
    .property-card-compact__content {
      width: 60%;
      justify-content: center;  
    }
  }
  
  &__image-wrapper {
    width: 100%;
    overflow: hidden;
    position: relative;
    padding: var(--re-image-padding, 0);
    padding-bottom: 0;
    
    :deep(.property-image) {
      width: 100%;
      aspect-ratio: var(--re-image-aspect-ratio, auto);
      object-fit: var(--re-image-object-fit, cover);
      border-radius: var(--re-image-border-radius, 0);
      transition: opacity 0.2s ease;
    }
  }
    &--draft {
    .property-card-compact__image-wrapper :deep(.property-image) {
      opacity: 0.4;
    }
  }
  
  &__draft-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    padding: 6px 14px;
    border-radius: 10px;
    background: #FF9600;
    color: #030009;
    text-align: center;
    font-family: var(--body-font-font-family);
    font-size: 14px;
    font-weight: 600;
    z-index: 1;
  }
  
  &__status-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    padding: var(--re-badge-padding, 6px) calc(var(--re-badge-padding, 6px) * 2.33);
    border-radius: var(--re-badge-border-radius, 10px);
    color: var(--re-badge-text-color, white);
    text-align: center;
    font-family: var(--body-font-font-family);
    font-size: var(--re-badge-font-size, 14px);
    font-weight: var(--re-badge-font-weight, 600);
    z-index: 1;
    
    &--sold {
      background: var(--re-badge-sold-background, #EF4444);
    }
    
    &--rented {
      background: var(--re-badge-rented-background, #3B82F6);
    }
  }
  
  &--draft {
    .property-card-compact__image-wrapper :deep(.property-image) {
      opacity: 0.4;
    }
  }
  
  &__draft-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    padding: 6px 14px;
    border-radius: 10px;
    background: #FF9600;
    color: #030009;
    text-align: center;
    font-family: 'Red Hat Text', sans-serif;
    font-size: 14px;
    font-weight: 600;
    z-index: 1;
  }
  
  // Preview variant uses same styling as default
  
  &__content {
    flex: 1;
    padding: var(--re-card-padding, 24px);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  &__header {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  
  &__title {
    margin: 0 !important;
    font-family: var(--re-title-font-family, var(--heading-font-font-family));
    font-size: var(--re-title-font-size, 24px);
    font-weight: var(--re-title-font-weight, 700);
    line-height: var(--re-title-line-height, 1.3);
    color: var(--re-title-color, #011E45);
  }
  
  &__actions {
    margin-top: auto;
    padding-top: 8px;
    display: flex;
    gap: 12px;
  }
  
  &__view-btn,
  &__edit-btn,
  &__edit-page-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px;
    background: white;
    color: #011E45;
    border: 2px solid rgba(1, 30, 69, 0.2);
    border-radius: 10px;
    font-family: var(--body-font-font-family);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      border-color: #011E45;
      background: rgba(1, 30, 69, 0.05);
    }
    
    svg {
      flex-shrink: 0;
    }
  }
  
  &__view-btn {
    border-color: rgba(34, 162, 78, 0.3);
    color: #22A24E;
    
    &:hover {
      border-color: #22A24E;
      background: rgba(34, 162, 78, 0.05);
    }
  }
  
  &__custom-fields {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 4px;
    padding-top: 12px;
  }
  
  &__custom-field {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }
  
  &__custom-label {
    font-weight: 600;
    color: rgba(1, 30, 69, 0.6);
  }
  
  &__custom-value {
    color: #011E45;
  }
  
  &__rental-details {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 8px;
    padding-top: 12px;
  }
  
  &__rental-field {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
  }
  
  &__rental-label {
    font-weight: 600;
    color: rgba(1, 30, 69, 0.6);
  }
  
  &__rental-value {
    color: #011E45;
  }
  
  &__rental-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #555;
    font-size: 16px;
    
    svg {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
    }
  }
}
</style>
