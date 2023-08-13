Theorem plus_1_n : forall n : nat, n + 1 = S n /\ S n > n.
Proof.
  intros n.
  split.
  - induction n as [| n' IHn'].
    + simpl. reflexivity.
    + simpl. rewrite <- IHn'. reflexivity.
  - induction n as [| n' IHn'].
    + simpl. apply le_n.
    + simpl. apply le_n_S. apply IHn'.
Qed.
Print plus_1_n.
Eval compute in (plus_1_n 5).

Theorem plus_1_natural : forall n : nat, 1 + n = S n /\ S n > n.
Proof.
  intros n.
  split.
  - reflexivity.
  - apply le_n_S. apply le_n.
Qed.
Print plus_1_natural.
Eval compute in (plus_1_natural 1).
