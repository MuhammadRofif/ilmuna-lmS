export const handleError = (error: any) => {

    const generalMessage  = 'Terjadi kesalahan pada server. Silahkan coba lagi nanti.';
    let statusCode = 500;
    let statusMessage = generalMessage;
    let message = generalMessage;
    let data: undefined;

    if (error?.statusCode) {

        statusCode = error.response.status;
        statusMessage = error.response.statusText

        if (error.response._data) {
            data = error.response._data && error.response.errors ? error.response.errors : undefined;
            message = error.response._data.message && error.response._data.message ? error.response._data.message : generalMessage;
        }
    }

    return {
        statusCode,
        statusMessage,
        message,
        data
    }


}