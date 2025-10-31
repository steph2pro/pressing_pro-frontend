import { useMutation } from "@tanstack/react-query";
import BeneficeApi from "../../../data/datasources/BeneficeApi";
import { AnalyseMargeRequest, AnalyseMargeCible } from "../../../data/models/benefice";
import { analyzeMarginTargetUseCase } from "../../../domain/usecases/benefices/analyzeMarginTargetUseCase";

const reportApi = new BeneficeApi();

export const useMarginTargetAnalysis = () => {
  const mutation = useMutation<
    AnalyseMargeCible,
    Error,
    AnalyseMargeRequest
  >({
    mutationFn: (params: AnalyseMargeRequest) => 
      analyzeMarginTargetUseCase(reportApi, params),
  });

  return {
    analyzeMarginTarget: mutation.mutate,
    data: mutation.data,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};