using API.ViewModels;
using AutoMapper;
using Business.Interfaces.Repositories;
using Business.Interfaces.Services;
using Business.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class SexoController : Controller
    {
        private readonly ISexoRepository _sexoRepository;
        private readonly ISexoService _sexoService;
        private readonly IMapper _mapper;

        public SexoController(ISexoRepository sexoRepository, ISexoService sexoService, IMapper mapper)
        {
            _sexoRepository = sexoRepository;
            _sexoService = sexoService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<SexoViewModel>> ObterTodos()
        {
            return _mapper.Map<IEnumerable<SexoViewModel>>(await _sexoRepository.ObterTodos());
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<SexoViewModel>> ObterPorId(int id)
        {
            return _mapper.Map<SexoViewModel>(await _sexoRepository.ObterPorId(id));
        }

        [HttpPost]
        public async Task<ActionResult<SexoViewModel>> Adicionar(SexoViewModel sexoVireModel)
        {
            return Ok(await _sexoService.Adicionar(_mapper.Map<Sexo>(sexoVireModel)));
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<SexoViewModel>> Atualizar(int id, SexoViewModel sexoVireModel)
        {
            if (id != sexoVireModel.SexoId)
            {
                return BadRequest(new { process = false, mensagem = "O id informado não é o mesmo que foi passado na query" });
            }

            if (!ModelState.IsValid) return BadRequest(new { process = false, mensagem = ModelState.Values.Select(x => x.Errors) });

            await _sexoService.Atualizar(_mapper.Map<Sexo>(sexoVireModel));

            return Ok(new { process = true, sexoVireModel });
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<SexoViewModel>> Excluir(SexoViewModel sexoViewModel)
        {
            var sexo = await _sexoRepository.ObterPorId(sexoViewModel.SexoId);

            if (sexo.SexoId == 0) return NotFound();

            await _sexoService.Remover(_mapper.Map<Sexo>(sexoViewModel));

            return Ok(new { process = true, sexoViewModel });
        }
    }
}