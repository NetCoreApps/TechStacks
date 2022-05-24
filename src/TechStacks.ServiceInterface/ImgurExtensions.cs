using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using ServiceStack;
using ServiceStack.Web;

namespace TechStacks.ServiceInterface
{
    public static class ImgurExtensions
    {
        private static HttpClient _client;
        private static HttpClient GetClient()
        {
            return _client ??= new HttpClient();
        }
        public static string UploadToImgur(this IHttpFile image, string imgurClientId, string paramName,
            int? minWidth = null, int? minHeight = null,
            int? maxWidth = null, int? maxHeight = null)
        {
            try
            {
                using var content = new MultipartFormDataContent();
                var imgurClient = HttpUtils.Create();

                var reqMsg = new HttpRequestMessage(HttpMethod.Post, "https://api.imgur.com/3/image");
                reqMsg.Headers.Add(HttpHeaders.Authorization, $"Client-ID {imgurClientId}");
                content.AddFile("image", image.FileName, image.InputStream, image.ContentType);
                reqMsg.Content = content;
                var responseMessage = imgurClient.Send(reqMsg);
                //var responseMessage = imgurClient.UploadFile(new HttpRequestMessage(HttpMethod.Post, "https://api.imgur.com/3/image"),image.InputStream, image.FileName, MimeTypes.GetMimeType(image.FileName), fieldName: "image");

                try
                {
                    var imgurRes =  responseMessage.ReadToEnd();
                    
                    var resText = imgurRes;
                    var jsonRes = JSON.parse(resText);
                    if (jsonRes is Dictionary<string, object> jsonObj)
                    {
                        if (jsonObj["data"] is Dictionary<string, object> data)
                        {
                            if (minWidth != null || maxWidth != null || minHeight != null || maxHeight != null)
                            {
                                var width = (int) data["width"];
                                var height = (int) data["height"];

                                if (width < minWidth || height < minHeight)
                                    throw new ArgumentException($"Minimum Dimensions {minWidth} x {minHeight}",
                                        paramName);

                                if (width > maxWidth || height > maxHeight)
                                    throw new ArgumentException($"Maximum Dimensions {maxWidth} x {maxHeight}",
                                        paramName);
                            }

                            if (data["link"] is string link && !string.IsNullOrEmpty(link))
                            {
                                return link.Replace("\\/", "/");
                            }
                        }
                    }
                
                }
                catch (WebException e)
                {
                    var errorMessage = GetImgurErrorMessage(e.GetResponseBody());
                    if (errorMessage != null)
                        throw new ArgumentException(errorMessage);

                    throw;
                }

                throw new ArgumentException("Invalid Upload Image Response", paramName);
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Could not upload image: " + ex.Message, paramName, ex);
            }
        }

        private static string GetImgurErrorMessage(string body)
        {
            if (body == null || !body.StartsWith("{"))
                return null;

            try
            {
                var obj = JSON.parse(body);
                if (obj is Dictionary<string, object> response)
                {
                    if (response.TryGetValue("data", out var data) && data is Dictionary<string, object> oData)
                    {
                        if (oData.TryGetValue("error", out var error) && error is Dictionary<string, object> oError)
                        {
                            var code = 0;
                            string type = null;
                            string message = null;

                            if (oError.TryGetValue("code", out var oCode))
                                code = (int) oCode;
                            if (oError.TryGetValue("type", out var oType))
                                type = (string) oType;
                            if (oError.TryGetValue("message", out var oMessage))
                                message = (string) oMessage;

                            return $"{type} ({code}): {message}";
                        }
                    }
                }
            }
            catch (Exception) { }

            return null;
        }        
    }
}