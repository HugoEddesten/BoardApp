using BoardProvider.Data.Contexts;
using BoardProvider.Data.Entities;
using BoardProvider.Models;
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

            DeleteModel model = JsonConvert.DeserializeObject<DeleteModel>(await new StreamReader(req.Body).ReadToEndAsync())!;

            BoardEntity? board = await _context.Boards.FirstOrDefaultAsync(x => x.Id == model.Id);
            if (board != null)
            {
                _context.Boards.Remove(board);
                await _context.SaveChangesAsync();
                return new NoContentResult();
            }
            return new BadRequestResult();
        }
    }
}
