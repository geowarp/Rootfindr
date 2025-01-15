import { IHypothesis } from "@/types/type";

export default function HypoInquiryPage() {
  return (
    <>
      <div>
        <h1>
          {/* {hypothesis.length === 0 ? (
            <p>No hypothesis have been created yet</p>
          ) : (
            <p>Click on a hypothesis to view more details</p>
          )} */}
        </h1>
        <h3>Create a Hypothesis</h3>
        <p>
          Please input the dependent/target/outcome variable that you would like
          to investigate
        </p>
        <p>
          Please input independent/predictor/feature variables that you would
          like to investigate for a potential correlation with the dependent
          variable
        </p>
      </div>
    </>
  );
}
