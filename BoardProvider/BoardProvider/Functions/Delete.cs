using BoardProvider.Data.Contexts;
using BoardProvider.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace BoardProvider.Functions
{
    public class Delete
    {
        private readonly ILogger<Delete> _logger;
        private readonly Context _context;

        public Delete(ILogger<Delete> logger, Context context)
        {
            _logger = logger;
            _context = context;
        }

        [Function("Delete")]
        public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Function, "delete", Route = "boards")] HttpRequest req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            string id = JsonConvert.DeserializeObject<string>(await new StreamReader(req.Body).ReadToEndAsync())!;

            BoardEntity board = await _context.Boards.FirstOrDefaultAsync(x => x.Id == id);
            if (board != null)
            {
                _context.Boards.Remove(board);
                return new NoContentResult();
            }
            return new BadRequestResult();
        }
    }
}
