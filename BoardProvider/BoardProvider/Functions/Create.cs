using BoardProvider.Data.Contexts;
using BoardProvider.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace BoardProvider.Functions
{
    public class Create
    {
        private readonly ILogger<Create> _logger;
        private readonly Context _context;

        public Create(ILogger<Create> logger, Context context)
        {
            _logger = logger;
            _context = context;
        }

        [Function("Create")]
        public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Function, "post", Route = "boards")] HttpRequest req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            BoardEntity board = JsonConvert.DeserializeObject<BoardEntity>(await new StreamReader(req.Body).ReadToEndAsync())!;
            if (board != null)
            {
                var result = _context.Boards.Add(board).Entity;
                if (result != null)
                {
                    await _context.SaveChangesAsync();
                    return new OkObjectResult(result);
                }
            }
            return new BadRequestResult();

            
        }
    }
}
