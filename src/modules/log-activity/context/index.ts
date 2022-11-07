import create, {SetState, GetState} from 'zustand';

interface LogState {
    dateRange: string | undefined;
}

interface LogActions {
    setDateRange: (payload: any) => void;
}

interface LogContext
    extends LogState,
        LogActions {}

const stateDefault: LogState = {
    dateRange: 'year',
};

const actions = (
    set: SetState<LogState>,
    get: GetState<LogState>,
): LogActions => ({
    setDateRange: (payload: any) => {
        set(state => ({
            ...state,
            dateRange: payload,
        }));
    },
});

export const useLogState = create<LogContext>(
    (set, get) => ({
        ...stateDefault,
        ...actions(set, get),
    }),
);
