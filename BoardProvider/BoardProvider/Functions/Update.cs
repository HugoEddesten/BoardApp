using BoardProvider.Data.Contexts;
using BoardProvider.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace BoardProvider.Functions
{
    public class Update
    {
        private readonly ILogger<Update> _logger;
        private readonly Context _context;


        public Update(ILogger<Update> logger, Context context)
        {
            _logger = logger;
            _context = context;
        }

        [Function("Update")]
        public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Function, "put", Route = "boards")] HttpRequest req)
        { 
            try
            {
                _logger.LogInformation("C# HTTP trigger function processed a request.");


                BoardEntity board = JsonConvert.DeserializeObject<BoardEntity>(await new StreamReader(req.Body).ReadToEndAsync())!;
                _context.Boards.Update(board);
                await _context.SaveChangesAsync();  

                return new OkResult();
            }
            catch (Exception ex)
            {
                _logger.LogError("err: " + ex.Message);
                return new BadRequestResult();
            }
        }
    }
}
