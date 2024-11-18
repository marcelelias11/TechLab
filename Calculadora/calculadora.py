import numpy as np
import matplotlib.pyplot as plt
from sympy.plotting import plot
import sympy as sp
from sympy.parsing.sympy_parser import parse_expr
from sympy.printing import latex
import statistics as stat
import math
import requests
from http.server import BaseHTTPRequestHandler, HTTPServer

def graph(eq:str, lowbound:float, upbound:float): #Função que plota o gráfico da equação desejada, recebe uma equação, e um limite superior e inferior do gráfico
    f = sp.sympify(eq) #Função a ser plotada
    if len(f.free_symbols) > 1: #Checagem para ver se não há mais de uma variável independente na equação, pois nesse caso ela não poderá ser plotada
        print("Função não pode ser plotada!")
        return
    plot(f, (sp.sympify("x"),lowbound,upbound)) #Plotar equação

class HTTPRequestHandler(BaseHTTPRequestHandler):
    """HTTP request handler with additional properties and functions."""

    def do_GET(self):
        """handle GET requests."""
        # Do stuff.

testarr:list = [6,6,6.1,6.9,6.2] #Listas de testes
testarr2:list = [5,5.6,6.1,5.9,5.2]
testarr3:list = [[8,8.9,8.1,8.6,8.2], [5,5.6,6.1,5.9,5.2], [4.1,4.6,3.1,3.9,4.2]]
unbarr:list = [0.1, 0.01, 0.01]

class StatCalc: #Classe que armazena a calculadora estatística
    __statdictlist:list = [] #Lista de armazenamento de dicionários de dados estatísticos
    __calcdict:dict = { #Dicionário que armazena os dados da calculadora estatística
        "avg": 0,
        "std": 0,
        "una": 0,
        "unb": 0,
        "unc": 0,
    }
    def __init__(self, eq:str, incertezab:list,value:list, lowbound:float, upbound:float): #Construtor da classe
        self.value = value
        self.eq = eq
        self.unb = incertezab
        self.lb = lowbound
        self.ub = upbound
        pass
    def calc(self): #Função que faz o cálculo estatístico, recebe uma lista de dados experimentais e incerteza instrumental
        for i in range(len(self.value)):
            self.__calcdict["avg"] = stat.mean(self.value[i]) #Média
            self.__calcdict["std"] = stat.stdev(self.value[i]) #Desvio Padrão
            self.__calcdict["una"] = self.__calcdict["std"]/math.sqrt(len(self.value[i])) #Incerteza experimental, dada pelo desvio padrão divido pela raíz quadrada do número de valores
            self.__calcdict["unb"] = self.unb[i] #Incerteza instrumental
            self.__calcdict["unc"] = math.sqrt((self.__calcdict["una"]**2)+(self.__calcdict["unb"])**2) #Incerteza combinada, dada pela soma pitagórica das incertezas anteriores
            statdict:dict = dict(avg = self.__calcdict["avg"], std = self.__calcdict["std"], una = self.__calcdict["una"], unb = self.__calcdict["unb"], unc = self.__calcdict["unc"], unz = 0) #Dicionário que armazena os dados
            self.__statdictlist.append(statdict) #Adiciona o dicionário de dados estatísticos na lista
        return(self.__statdictlist)

    def clean(self): #Limpa a lista após uso
        self.__statdictlist = []

    def propag(self): #Propagação da incerteza na equação, recebe uma equação em string e um dicionário das variáveis e seus valores
        f = sp.sympify(self.eq) #Função convertida por um formato legível pelo sympy
        y = sp.sympify("z - z") #Função que irá armaznar a equação da soma das derivadas parciais
        index = 0 #Variável que irá armezenar o índice pra percorrer a lista de dicionário de dados
        subslist = []
        print(f.atoms(sp.Symbol))
        for i in f.atoms(sp.Symbol): #Loop que irá dinamicamente calcular a soma pitagórica (exceto pela raíz) da incerteza
            print(index)
            diffeq = sp.diff(f, sp.sympify(i)) #Derivada parcial da equação em função da variável do dicionário
            y += sp.sympify(f"({diffeq}*{self.__statdictlist[index]["unc"]})**2") #Monta a equação a ser resolvida
            subslist.append((sp.sympify(i), self.__statdictlist[index]["avg"]))
            #resultlist[index] = resultlist[index]**2
            index += 1 #Incrementa o índice
        for i in self.__statdictlist: #Adiciona a incerteza propagada na lista de dicionários
            i["unz"] = math.sqrt(y.subs(subslist)) #Passo final da propagação da incerteza: tirar a raíz quadrada da soma
        return(self.__statdictlist)
    def statgraph(self): #Função que plota o gráfico da equação desejada
        graph(self.eq, self.lb, self.ub)

class Simulator:
    #TODO
    dummyvar = 0

statobj = StatCalc("x - x**2", unbarr, testarr3, -10, 10)
print(statobj.calc()) #Chamada de teste
print(statobj.propag()) #Chamada de teste
statobj.statgraph() #Chamada de teste
statobj.clean() #Chamada de teste
graph("sin(x)", -20, 20) #Chamada de teste