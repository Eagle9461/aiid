import { useContext } from 'react';
import ToastContext from '../contexts/ToastContext';

import {
  faCheckCircle,
  faTimesCircle,
  faExclamationTriangle,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

export const SEVERITY = {
  success: {
    key: 'success',
    icon: faCheckCircle,
    faClass: 'far fa-check-circle fa-2xl',
    className: 'bg-green-600',
  },
  danger: {
    key: 'danger',
    icon: faTimesCircle,
    faClass: 'far fa-times-circle fa-2xl',
    className: 'bg-red-700',
  },
  warning: {
    key: 'warning',
    icon: faExclamationTriangle,
    faClass: 'far fa-exclamation-triangle fa-2xl',
    className: 'bg-amber-400',
  },
  info: {
    key: 'info',
    icon: faInfoCircle,
    faClass: 'far fa-info-circle fa-2xl',
    className: 'bg-blue-600',
  },
};

export default function useToastContext() {
  return useContext(ToastContext);
}
