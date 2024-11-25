import numpy as np
import matplotlib.pyplot as plt
import io
import base64

class Simulator:
    # Constants
    __L = 1
    # Input amplitudes
    def __init__(self, harmonics:list,option:int, time:float, energy:int, choice: int): #Construtor da classe
        self.harm = harmonics
        self.op = option
        self.time = time
        self.energy = energy
        self.choice = choice
        pass
    
    def __waves(self):
        A = np.array(list(map(float, self.harm)))
        n = len(A)  # Number of harmonics

        # Display wave type options
        #print("Choose the type of wave:")
        #print("1 - Traditional wave")
        #print("2 - Triangular wave")
        #print("3 - Square wave")
        #print("4 - Sawtooth wave")
        option = self.op

        t = np.linspace(0, np.pi, self.time)

        # Wave calculation
        y = np.zeros_like(t)
        if option == 1:
            for i in range(1, n + 1):
                y += A[i - 1] * np.sin(2 * np.pi * i * t)
            title = "Resulting wave from the sum of sinusoidal harmonics"
        elif option == 2:
            for i in range(1, n + 1):
                if i % 2 == 1:  # Include only odd harmonics
                    y += (8 / np.pi**2) * ((-1)**((i - 1) // 2) / (i**2)) * np.sin(2 * np.pi * i * t)
            title = "Resulting triangular wave"
        elif option == 3:
            for i in range(1, n + 1):
                k = 2 * i - 1  # Odd harmonic order
                y += A[i - 1] * np.sin(2 * np.pi * k * t) / k
            title = "Resulting square wave"
        elif option == 4:
            for i in range(1, n + 1):
                y += (1 / (2 * i * np.pi)) * np.sin(2 * np.pi * i * t)
            title = "Resulting sawtooth wave"
        else:
            print("Invalid option!")
            exit()

        # Plot the result
        plt.plot(t, y)
        plt.xlabel('Time')
        plt.ylabel('Amplitude')
        plt.title(title)
        plt.grid(True)

        buf = io.BytesIO()
        plt.savefig(buf, format='png')
        buf.seek(0)
        graph_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
        buf.close()
        plt.close()
        return graph_base64
    
    def __prob_well(self):
        # Define functions
        def P(x):
            """Probability density function derived from psi(x)."""
            psi = np.sqrt(2 / self.__L) * np.sin(self.energy * np.pi * x / self.__L)  # psi(x)
            return psi**2  # P(x)

        def Q(x):
            """Proposal uniform distribution."""
            return np.sqrt(2 / self.__L)

        # Number of samples
        N = 100000

        # Metropolis-Hastings sampling
        x = np.zeros(N)
        i = 0
        while i < N:
            # Generate a sample from the proposal distribution
            x1 = np.random.rand()  # Uniform distribution in [0, 1]
            
            # Calculate acceptance ratio
            accept_ratio = P(x1) / Q(x1)
            
            # Generate a random number for acceptance/rejection
            u = np.random.rand()
            
            # Accept or reject the sample
            if u <= accept_ratio:
                x[i] = x1
                i += 1

        # Plot histogram of generated samples
        plt.hist(x, bins=100, density=True, alpha=0.75, label="Sampled Distribution")
        plt.xlabel("x")
        plt.ylabel("Probability Density")
        plt.title("Histogram of Generated Samples")
        plt.legend()
        plt.grid(True)

        buf = io.BytesIO()
        plt.savefig(buf, format='png')
        buf.seek(0)
        graph_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
        buf.close()
        plt.close()
        return graph_base64
    
    def send(self):
        if self.choice == 1:
            return ({"graph": self.__waves()})
        if self.choice == 2:
            return ({"graph": self.__prob_well()})