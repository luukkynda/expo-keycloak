declare const useAsyncStorage: <T>(key: string, defaultValue?: T | null) => [T | null, (newValue: T) => void, boolean];
export default useAsyncStorage;
