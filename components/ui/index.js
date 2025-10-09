import CButton from './CButton.vue';
import CCheckbox from './CCheckbox.vue';
import CIcon from './CIcon.vue';
import CImageInput from './CImageInput.vue';
import CInput from './CInput.vue';
import CTag from './CTag.vue';
import CTagDetect from './CTagDetect.vue';
import CTextArea from './CTextArea.vue';
import CToggleable from './CToggleable.vue';
import CLikeButton from '@/components/ui/CLikeButton';
import CPointsButton from '@/components/ui/CPointsButton.vue';

const UI = {
  install(Vue) {
    Vue.component('CButton', CButton);
    Vue.component('CCheckbox', CCheckbox);
    Vue.component('CIcon', CIcon);
    Vue.component('CImageInput', CImageInput);
    Vue.component('CInput', CInput);
    Vue.component('CTag', CTag);
    Vue.component('CTagDetect', CTagDetect);
    Vue.component('CTextArea', CTextArea);
    Vue.component('CToggleable', CToggleable);
    Vue.component('CLikeButton', CLikeButton);
    Vue.component('CPointsButton', CPointsButton);
  },
};

export default UI;
