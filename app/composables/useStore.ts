import type { APIError, State } from "../types";

const state = reactive<State>({
  isLoading: false,
  appError: null,
  isConfirmModalVisible: false,
});

export const useStore = () => {
  const { isLoading, appError, isConfirmModalVisible } = toRefs(state);
  const toast = useToast();

  const toggleLoading = (value: boolean) => {
    state.isLoading = value;
  };
  const toggleAlertModal = (value: boolean) => {
    state.isConfirmModalVisible = value;
  };
  const toggleError = (error: null | APIError) => {
    state.appError = error;
  };

  const showMessage = (content: { title: string; description?: string }) => {
    toast.add({
      title: content.title,
      description: content.description,
      color: "primary",
    });
  };

  const showError = (error: APIError) => {
    toast.add({
      title: error.statusCode + " ",
      description: error.message ? error.message : error.statusMessage,
      color: "error",
    });
  };

  return {
    isLoading,
    appError,
    showError,
    showMessage,
    toggleLoading,
    toggleError,
    toggleAlertModal,
    isConfirmModalVisible,
  };
};
