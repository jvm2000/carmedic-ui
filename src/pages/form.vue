<script setup lang="ts">
import Appointment from '../components/form/Appointment.vue';
import Collection from '../components/form/Collection.vue';
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

    <div v-if="currentStep === 2">
      <Appointment />
    </div>

    <div v-if="currentStep === 3">
      <Collection />
    </div>
  </FormLayout>
</template>