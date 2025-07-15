// src/pages/dashboard/SuperAdminPage.tsx
import { Button } from "../../components/ui/Button";
import { PlusCircle } from "lucide-react";

export function SuperAdminPage() {
    // Dados fictícios de contas de clientes (clínicas/empresas)
    const contas = [
        { id: 'cli_1', nome: 'Clínica Viva Saúde', plano: 'Business', status: 'Ativo' },
        { id: 'cli_2', nome: 'Rafael Silva (Personal)', plano: 'Profissional', status: 'Ativo' },
        { id: 'cli_3', nome: 'NutriBem', plano: 'Profissional', status: 'Pendente Pagamento' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Painel da Plataforma</h1>
                <Button><PlusCircle size={16} className="mr-2" /> Nova Conta de Cliente</Button>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Cliente</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Plano</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                            <th className="relative px-6 py-3"><span className="sr-only">Ações</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {contas.map(conta => (
                            <tr key={conta.id}>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{conta.nome}</td>
                                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{conta.plano}</td>
                                <td className="px-6 py-4 text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${conta.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {conta.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right text-sm font-medium">
                                    <a href="#" className="text-cyan-600 hover:text-cyan-900">Gerir</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
