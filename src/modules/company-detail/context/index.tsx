import create, {SetState, GetState} from 'zustand';

// import { useParams } from 'react-router-dom';

interface SummaryCompanyDetailState {
  companyId: any;
}

interface SummaryCompanyDetailActions {
    setcompanyId: (payload: any) => void;
  }

interface SummaryCompanyDetailContext
  extends SummaryCompanyDetailState,
    SummaryCompanyDetailActions {}

const stateDefault: SummaryCompanyDetailState = {
  companyId: '',
};

const actions = (
    set: SetState<SummaryCompanyDetailState>,
    get: GetState<SummaryCompanyDetailState>,
  ): SummaryCompanyDetailActions => ({
    setcompanyId: (payload: any) => {
      set(state => ({
        ...state,
        companyId: payload,
      }));
    },
  });
  
  export const useSummaryCompanyDetailState =
    create<SummaryCompanyDetailContext>((set, get) => ({
      ...stateDefault,
      ...actions(set, get),
    }));
  