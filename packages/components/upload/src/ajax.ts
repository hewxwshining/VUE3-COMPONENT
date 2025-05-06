import { UploadProgressEvent } from "./upload";
import { RequestOptions } from "./upload-content";

export function httpRequest(options: RequestOptions) {
  console.log(options)
  const xhr = new XMLHttpRequest()
  const action = options.action

  xhr.open(options.method, action, true)

  xhr.upload.addEventListener('progress', (e: ProgressEvent) => {

    const processEvents = e as UploadProgressEvent
    processEvents.percentage = e.total > 0 ? (e.loaded / e.total) * 100 : 0
    options.onProgress(processEvents)


  }, false)

  const headers = options.headers
  if (headers) {
    Object.keys(options.data).forEach((key) => {
      xhr.setRequestHeader(key, options.data[key])
    })
  }

  const formData = new FormData()
  if (options.data) {
    Object.keys(options.data).forEach((key) => {
      formData.append(key, options.data[key])
    })
  }
  formData.append(options.name, options.file)
  xhr.onload = function () {
    console.log("xhr.status = " , xhr.status)
    if (xhr.status < 300 && xhr.status >= 200) {
      options.onsuccess(xhr.response)
    } else {
      options.onError({ status: xhr.status })
    }
  }

  xhr.addEventListener('error', (e) => {
    console.log('addEventListener error', e)
    options.onError(e)
  })

  xhr.send(formData)
  return xhr
}
