import simulator as sim
import statcalc as sc

testarr:list = [6,6,6.1,6.9,6.2] #Listas de testes
testarr2:list = [5,5,5,5,5]
testarr3:list = [[8,8.9,8.1,8.6,8.2], [5,5.6,6.1,5.9,5.2], [4.1,4.6,3.1,3.9,4.2]]
unbarr:list = [0.1, 0.01, 0.01]
optiontest:int = 3
timetest:float = 1000


statobj = sc.StatCalc("y - x**2", unbarr, testarr3, -10, 10)
simobj = sim.Simulator(testarr2, optiontest, timetest, 5, 2)
statobj.send() #Chamada de teste
simobj.send()
#simobj.prob_well()