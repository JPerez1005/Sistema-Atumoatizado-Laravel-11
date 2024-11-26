import { ref, onMounted, watch, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useGenericStore } from '../store/useGenericStore.js';

export { ref, onMounted, watch, computed, useRouter, useRoute, useGenericStore };
export * from './useFormModel.js';
export * from './useListModel.js';
