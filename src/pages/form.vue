<script setup lang="ts">
import Contact from '../components/form/Contact.vue';
import VehicleDetails from '../components/form/VehicleDetails.vue';
import { useForm } from '../composables/useForm';
import FormLayout from '../layouts/FormLayout.vue';

const { currentStep } = useForm()
</script>

<template>
  <FormLayout>
    <div v-if="currentStep === 0">
      <Contact />
    </div>

    <div v-if="currentStep === 1">
      <VehicleDetails />
    </div>
  </FormLayout>
</template>