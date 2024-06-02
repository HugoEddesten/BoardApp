using BoardProvider.Data.Contexts;
using BoardProvider.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BoardProvider.Functions
{
    public class GetAll
    {
        private readonly ILogger<GetAll> _logger;
        private readonly Context _context;


        public GetAll(ILogger<GetAll> logger, Context context)
        {
            _logger = logger;
            _context = context;
        }

        [Function("GetAll")]
        public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Function, "get", Route = "boards")] HttpRequest req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            List<BoardEntity> boards = await _context.Boards.Include(i => i.TextBoxes).ToListAsync();
            if (boards != null) 
            {
                return new OkObjectResult(boards);
            }
            return new BadRequestResult();


        }
    }
}
