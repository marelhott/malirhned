export function WorkflowProgress({ currentStep }) {
  const steps = ['Cena', 'Termín', 'Malíř', 'Objednávka']

  return (
    <div className="workflow-progress" aria-label="Postup objednávky">
      {steps.map((step, index) => {
        const stepNumber = index + 1
        const isActive = stepNumber === currentStep
        const isComplete = stepNumber < currentStep

        return (
          <div
            key={step}
            className={`workflow-progress-item ${isActive ? 'is-active' : ''} ${isComplete ? 'is-complete' : ''}`}
          >
            <span>{stepNumber}</span>
            <strong>{step}</strong>
          </div>
        )
      })}
    </div>
  )
}
