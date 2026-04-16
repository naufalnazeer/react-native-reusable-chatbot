import {
    pick,
    keepLocalCopy,
    errorCodes,
    isErrorWithCode
} from '@react-native-documents/picker';
import type { LocalCopyResponse, } from '@react-native-documents/picker';

export const pickFile = async (): Promise<LocalCopyResponse | null> => {
    try {
        const [file] = await pick()

        const [localCopy] = await keepLocalCopy({
            files: [
                {
                    uri: file.uri,
                    fileName: file.name ?? 'fallbackName',
                },
            ],
            destination: 'documentDirectory',
        })



        return localCopy;
    } catch (err) {
        if (isErrorWithCode(err)) {
            switch (err.code) {
                case errorCodes.IN_PROGRESS:
                    console.warn('user attempted to present a picker, but a previous one was already presented')
                    break
                case errorCodes.UNABLE_TO_OPEN_FILE_TYPE:
                    console.warn('unable to open file type')
                    break
                case errorCodes.OPERATION_CANCELED:
                    // ignore
                    break
                default:
                    console.error(err)
            }
        } else {
        }

        return null;
    }
};