import * as mathjs from 'mathjs';
import plotly from 'plotly';
import numeral from 'numeral';

async function Estatisticas(req,res){
    const { operacao, valores } = req.body;
    let resultado;

    switch (operacao) {
        case 'media':
                resultado = math.mean(valores);
                break;
        case 'mediana':
                resultado = math.median(valores);
                break;
        case 'desvio':
                resultado = math.std(valores);
                break;
        case 'derivada':
                const expr = math.parse(valores);
                resultado = expr.derivative('x').toString();
                break;
        case 'integral':
                const integralExpr = math.parse(valores);
                resultado = integralExpr.integrate('x').toString();
                break;
            default:
                return res.status(400).json({ erro: 'Tipo de operação não reconhecido' });
    }

    res.json({ resultado });
}

async function CalcularContas(req,res){
    const { tipo, equacao, sistema } = req.body;

    try {
        let resultado;
        if (tipo === 'equacao') {
            // Resolve equações simples 
            resultado = mathjs.simplify(equacao).toString();
        } else if (tipo === 'sistema') {
            // Resolve sistemas de equações
            resultado = math.lusolve(sistema.matriz, sistema.resultados);
        } else {
            return res.status(400).json({ erro: 'Tipo de operação não reconhecido' });
        }
        res.json({ resultado });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao calcular equação', detalhes: err.message });
    }
}

async function Graficos(req,res){
    const { tipo, dados } = req.body;

    try {
        let grafico;
        if (tipo === '2d') {
            // Exemplo de gráfico 2D simples (função y = f(x))
            grafico = {
                data: [{
                    x: dados.x,
                    y: dados.y,
                    type: 'scatter',
                    mode: 'lines+markers',
                }],
                layout: {
                    title: 'Gráfico 2D',
                    xaxis: { title: 'X' },
                    yaxis: { title: 'Y' }
                }
            };
        } else if (tipo === '3d') {
            // Exemplo de gráfico 3D
            grafico = {
                data: [{
                    x: dados.x,
                    y: dados.y,
                    z: dados.z,
                    type: 'scatter3d',
                    mode: 'markers',
                    marker: { size: 5 }
                }],
                layout: {
                    title: 'Gráfico 3D',
                    scene: {
                        xaxis: { title: 'X' },
                        yaxis: { title: 'Y' },
                        zaxis: { title: 'Z' }
                    }
                }
            };
        } else {
            return res.status(400).json({ erro: 'Tipo de gráfico não reconhecido' });
        }

        const graphUrl = plotly.getImage(grafico, { format: 'png' });
        res.json({ url: graphUrl });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao gerar gráfico', detalhes: err.message });
    }
}

async function SimularProcesso(req,res){
    const { tipo, parametros } = req.body;
    let numerical = numeral
    try {
        let resultado;
        if (tipo === 'metodo-de-newton') {
            // Simulação de processo numérico usando o Método de Newton
            resultado = numerical.newton(parametros.funcao, parametros.inicial);
        } else if (tipo === 'integração') {
            // Simulação de integração numérica
            resultado = numerical.integrate(parametros.funcao, parametros.intervalo);
        } else {
            return res.status(400).json({ erro: 'Tipo de simulação não reconhecido' });
        }
        res.json({ resultado });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao simular processo', detalhes: err.message });
    }
}

async function ResultadoEquacao(req,res){
    const equation = req.query.equation;
    console.log(equation)
  try {
    const result = mathjs.evaluate(equation);
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: 'Equação inválida' });
  }
}

export {
    Estatisticas,
    CalcularContas,
    Graficos,
    SimularProcesso,
    ResultadoEquacao
}