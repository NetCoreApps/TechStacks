var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();
ServiceStack.Licensing.RegisterLicense("OSS BSD-2-Clause 2023 https://github.com/NetCoreApps/TechStacks saetukAMlCkth5Y5cwlWBGdK7iv4MteXIIooIstIMz3lrJotPYulM15WYSnGxeg1Wc42Cp0rrN0KVSfXCinncvC8750lzxz4rDB4eGuJW/1p0wcspHH8IevKJUJ/EFe5AoDihHXIOj4ITXil11/Ouc3eGC4LtQcG8U2xVdQwD4Y=");
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
    app.UseHttpsRedirection();
}

app.Run();
