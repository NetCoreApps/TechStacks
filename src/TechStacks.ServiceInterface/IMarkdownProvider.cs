using System;
using System.Net;
using System.Threading.Tasks;
using ServiceStack;
using ServiceStack.Logging;

namespace TechStacks.ServiceInterface
{
    public interface IMarkdownProvider
    {
        Task<string> TransformAsync(string markdown, string authToken = null);
    }

    public class GitHubApiMarkdownProvider : IMarkdownProvider
    {
        public static ILog Log = LogManager.GetLogger(typeof(GitHubApiMarkdownProvider));

        public const string GithubApiBaseUrl = "https://api.github.com";
        public const string UserAgent = "TechStacks";

        public string Base64UserPass { get; set; }

        public GitHubApiMarkdownProvider(string base64UserPass = null)
        {
            Base64UserPass = base64UserPass;
        }

        public async Task<string> TransformAsync(string markdown, string authToken = null)
        {
            if (string.IsNullOrEmpty(markdown))
                return null;

            try
            {
                var html = await $"{GithubApiBaseUrl}/markdown/raw"
                    .PostStringToUrlAsync(markdown,
                        contentType: MimeTypes.PlainText,
                        requestFilter: req => ConfigureRequest(req, authToken));

                return "<div class=\"gfm\">" + html + "</div>";
            }
            catch (Exception ex)
            {
                Log.Error("GitHub failed to convert markdown\n" + markdown.SafeSubstring(0, 500), ex);
                var html = MarkdownConfig.Transform(markdown);
                return "<div class=\"gfm ssfm\">" + html + "</div>";
            }
        }

        private void ConfigureRequest(HttpWebRequest req, string githubToken)
        {
            if (!string.IsNullOrEmpty(githubToken))
            {
                req.Headers[HttpHeaders.Authorization] = "Token " + githubToken;
            }
            else if (!string.IsNullOrEmpty(Base64UserPass))
            {
                req.Headers[HttpHeaders.Authorization] = "Basic " + Base64UserPass;
            }

            req.UserAgent = UserAgent;
        }
    }
}