open import Data.List
open import Data.Product
open import Data.Nat

data UniqueId : Set where
  id : ℕ → UniqueId

data Type : Set where
  functionType : Type → Type → Type
  Bool, Numb Empty : Type
  Listt : Type → Type
  -- important after
  newType : List(List (Type × UniqueId)) → UniqueId  → Type
--   -----------------------------------------------------------------------------------
--   The idNumber on each constructor becomes in-scope name of function which is the constructor
--   The idNumber at the end is the in-scope name of pattern-matching function
--   -----------------------------------------------------------------------------------

data Function : Type → Type → Set where
  function : (input : Type) → (output : Type) → (return : Function Empty output) → Function input output
  newVar : (type : Type) → (id : UniqueId) → Function Empty Empty
  getVar : (type : Type) → (id : UniqueId) → Function Empty type -- only valid if type corresponds correctly to the id
  apply : (input : Type) → (output : Type) → Function input output → Function Empty input → Function Empty output
  -- important before
  number : ℕ → Function Empty Numb
  add : Function Numb (functionType Numb Numb)
  add2 : Function Numb Numb
  procedure : (output : Type) → (body : List (Function Empty Empty)) → (Function Empty output) → (Function Empty output)

exampleProg : Function Empty Numb
exampleProg = function Empty Numb (procedure
  Numb ((newVar Numb (id 0)) ∷ [ newVar Numb (id 1) ])
  (apply Numb Numb add2 (getVar Numb (id 0))))
