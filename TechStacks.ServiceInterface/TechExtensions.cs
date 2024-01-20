using System;
using System.Data;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
using System.Linq;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.Logging;
using ServiceStack.OrmLite;
using TechStacks.ServiceModel;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceInterface;

public static class TechExtensions
{
    private static ILog Log = LogManager.GetLogger(typeof(TechExtensions));

    public static TechnologyInStack ToTechnologyInStack(this TechnologyChoice technologyChoice)
    {
        var result = technologyChoice.ConvertTo<TechnologyInStack>();
        result.PopulateWith(technologyChoice.Technology);
        result.Id = technologyChoice.Id;
        return result;
    }

    private static readonly Regex InvalidCharsRegex = new Regex(@"[^a-z0-9\s-]", RegexOptions.Compiled);
    private static readonly Regex CollapseSpacesRegex = new Regex(@"\s+", RegexOptions.Compiled);
    private static readonly Regex SpacesRegex = new Regex(@"\s", RegexOptions.Compiled);
    private static readonly Regex CollapseHyphensRegex = new Regex("-+", RegexOptions.Compiled);

    /// <summary>
    /// From http://stackoverflow.com/a/2921135/670151
    /// </summary>
    /// <param name="phrase"></param>
    /// <returns></returns>
    public static string GenerateSlug(this string phrase)
    {
        var str = phrase.RemoveAccent().ToLower()
            .Replace("#", "sharp")  // c#, f# => csharp, fsharp
            .Replace("++", "pp");   // c++ => cpp

        str = InvalidCharsRegex.Replace(str, "-");
        //// convert multiple spaces into one space   
        //str = CollapseSpacesRegex.Replace(str, " ").Trim();
        // cut and trim 
        str = str.Substring(0, str.Length <= 100 ? str.Length : 100).Trim();
        str = SpacesRegex.Replace(str, "-");
        str = CollapseHyphensRegex.Replace(str, "-");

        if (string.IsNullOrEmpty(str))
            return null;

        if (str[0] == '-')
            str = str.Substring(1);
        if (str[str.Length - 1] == '-')
            str = str.Substring(0, str.Length - 1);

        return str;
    }

    public static string RemoveAccent(this string txt)
    {
        // https://github.com/dotnet/corefx/issues/9158
        // byte[] bytes = System.Text.Encoding.GetEncoding("Cyrillic").GetBytes(txt);
        // return System.Text.Encoding.ASCII.GetString(bytes);
        return txt;
    }

    public static async Task<long> RegisterPageViewAsync(this IDbConnection db, string id)
    {
        var rows = await db.ExecuteSqlAsync("UPDATE page_stats SET view_count = view_count + 1 WHERE id = @id", new { id });
        var parts = id.Substring(1).SplitOnFirst('/');
        if (rows == 0 && parts.Length == 2)
        {
            var type = parts[0];
            var slug = parts[1];

            return await db.InsertAsync(new PageStats {
                Id = id,
                RefType = type,
                RefSlug = slug,
                ViewCount = 1,
                LastModified = DateTime.UtcNow,
            });
        }
        return 0;
    }
}