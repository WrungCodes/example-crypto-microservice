module.exports = {
    success: success,
    serverError: serverError,
    notFound: notFound,
    badRequest: badRequest,
    badGateway: badGateway,
    validationError: validationError,
    unauthorized: unauthorized,
    serviceUnavailable: serviceUnavailable,
}

function success(res, data) {
    return res.status(200).json(data)
}

function serverError(res, message) {
    return res.status(500).json({message: message ?? 'error occoured processing request, try again'})
}

function notFound(res, message) {
    return res.status(404).json({message: message ?? 'not found'})
}

function badRequest(res, message) {
    return res.status(400).json({message: message})
}

function badGateway(res, message) {
    return res.status(504).json({message: message ?? 'bad gateway talking to 3rd Party'})
}

function validationError(res, data) {
    return res.status(422).json(data)
}

function serviceUnavailable(res, message) {
    return res.status(503).json({message: message ?? 'service selected is currently unavailable'})
}

function unauthorized(res, message) {
    return res.status(401).json({message: message ?? 'unauthorized'})
}